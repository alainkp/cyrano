require 'open-uri'
require 'nokogiri'

USERS = [
  {
    email: 'basile@cyrona.com',
    password: 123456,
    first_name: 'Basile',
    last_name: 'QUINCHON'
  },
  {
    email: 'medhi@cyrona.com',
    password: 123456,
    first_name: 'Mehdi',
    last_name: 'SIJELMASSI'
  },
  {
    email: 'antoine@cyrona.com',
    password: 123456,
    first_name: 'Antoine',
    last_name: 'FILLER'
  },
  {
    email: 'alain@cyrona.com',
    password: 123456,
    first_name: 'Alain',
    last_name: 'KONG'
  }
]


def scrap_poems
  url = 'https://wheatoncollege.edu/vive-voix/par-incipit/'
  list = Nokogiri::HTML(open(url).read).search('.columns.small-12.main li a')
  list.each_with_index do |poem, i|
    next if i.odd?
    poem_url = poem.attributes['href'].value.to_s
    author = list[i + 1].text.strip
    if !poem_url.match?(/(https:)/)
      content = Nokogiri::HTML(open("https://wheatoncollege.edu#{poem_url}").read).search('.columns.small-12.main p').text.strip.split('dit par').first
      title = Nokogiri::HTML(open("https://wheatoncollege.edu#{poem_url}").read).search('.hero__title').text.strip
      audio = Nokogiri::HTML(open("https://wheatoncollege.edu#{poem_url}").read).search('.wp-audio-shortcode a').text.strip
    else
      content = Nokogiri::HTML(open(poem_url).read).search('.columns.small-12.main p').text.strip.split('dit par').first
      title = Nokogiri::HTML(open(poem_url).read).search('.hero__title').text.strip
      audio = Nokogiri::HTML(open(poem_url).read).search('.wp-audio-shortcode a').text.strip
    end
    poem = Poem.new(
      title: title,
      author_name: author,
      content: content,
      audio_url: audio,
      difficulty: rand(1..5)
    )
    poem.save!
    puts "Created #{poem.title} by #{poem.author_name}"
  end
end

def seed_users
  USERS.each_with_index do |user_hash, i|
    new_user = User.new(user_hash)
    new_user.save!
    puts "##{i+1} #{new_user.email} is create."
  end
end

def seed_lessons
  User.all.each_with_index do |user, i|
    puts "Create lessons for #{user.last_name} #{user.first_name}."
    # Create lessons with random progression
    3.times do
      lesson = Lesson.new(user: user, poem: Poem.all.sample)
      lesson.reading_progression = rand(1..100)
      lesson.listening_progression = rand(1..100)
      recite = Recite.new(progression: rand(1..100), duration: rand(1000..30000))
      recite.lesson = lesson
      recite.save!
      lesson.save!
      puts "Lesson #{lesson.id} with random progression created."
    end

    # Create lessons with 0% progression
    3.times do
      lesson = Lesson.new(user: user, poem: Poem.all.sample)
      lesson.reading_progression = 0
      lesson.listening_progression = 0
      recite = Recite.new(progression: 0, duration: 0)
      recite.lesson = lesson
      recite.save!
      lesson.save!
      puts "Lesson #{lesson.id} with 0\% progression created."
    end
  end
end


if Poem.count == 0
  puts "⚠️  Destroy all poems"
  Poem.destroy_all
  puts "➕  Seed poems..."
  scrap_poems
else
  puts "⚠️  No poems inserted, you already have #{Poem.count} !"
end

puts "⚠️  Destroy all recites"
Recite.destroy_all
puts "⚠️  Destroy all lessons"
Lesson.destroy_all
puts "⚠️  Destroy all users"
User.destroy_all

puts "➕  Seed users..."
seed_users

puts "➕  Seed lessons..."
seed_lessons

