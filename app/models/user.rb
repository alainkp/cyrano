class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :lessons
  has_many :poems, through: :lessons
  has_many :recites, through: :lessons

  def started?(poem)
    Lesson.find_by(poem_id: poem.id, user_id: id)
  end

  def completed?(poem)
    lesson = Lesson.find_by(poem_id: poem.id, user_id: id)
    if lesson && !lesson.recites.empty?
      lesson.recites.last.progression == 100
    end
  end
end
