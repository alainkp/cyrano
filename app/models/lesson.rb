class Lesson < ApplicationRecord
  belongs_to :user
  belongs_to :poem
  has_many :recites
end
