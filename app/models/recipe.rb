class Recipe < ApplicationRecord
    has_many :liked_recipes, dependent: :destroy
    has_many :users_who_liked, through: :liked_recipes
end
