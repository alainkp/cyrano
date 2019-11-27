class Poem < ApplicationRecord
  has_many :lessons
  has_many :users, through: :lessons
end

# Post.find_by name: 'Spartacus', rating: 4
