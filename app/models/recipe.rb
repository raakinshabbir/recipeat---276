class Recipe < ApplicationRecord
  has_one_attached :photo
  
  validates :title, :ingredients, :instructions, :cooking_time, :servings, :difficulty, presence: true

end