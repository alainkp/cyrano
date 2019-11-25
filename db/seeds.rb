require 'open-uri'
require 'nokogiri'
Poem.destroy_all
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
      audio_url: poem_url,
      author_name: author,
      content: content,
      audio: audio
    )
    poem.save!
    puts "Created #{poem.title} by #{poem.author_name}"
  end
end
scrap_poems
