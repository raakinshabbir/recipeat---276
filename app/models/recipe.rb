require "net/http" # Add this line
require "json"     # You might need this if you're using JSON parsing

class Recipe < ApplicationRecord
  has_one_attached :photo

  validates :title, :ingredients, :instructions, :cooking_time, :servings, :difficulty, presence: true

  has_many :liked_recipes
  has_many :users, through: :liked_recipes

  
  def self.fetch_new_recipes_from_api(count = 10)
    url = URI("https://www.themealdb.com/api/json/v1/1/random.php")
    recipes = []

    count.times do
      response = Net::HTTP.get(url)
      meal_data = JSON.parse(response)["meals"]&.first # Get the first meal object

      next unless meal_data # Skip if no meal data

      # Fetch all ingredients
      ingredients = (1..20).map do |i|
        ingredient = meal_data["strIngredient#{i}"]
        measure = meal_data["strMeasure#{i}"]
        "#{measure} #{ingredient}".strip if ingredient.present?
      end.compact.join(", ") # Join ingredients into a string

      # Check if the recipe already exists in the database by its unique ID (or title)
      existing_recipe = Recipe.find_by(title: meal_data["strMeal"])

      if existing_recipe
        # If the recipe exists, use the same attributes for cooking_time, servings, and difficulty
        recipes << existing_recipe
      else
        # Otherwise, create a new recipe with random values for cooking_time, servings, and difficulty
        recipes << Recipe.create!(
          title: meal_data["strMeal"],
          ingredients: ingredients,
          instructions: meal_data["strInstructions"],
          cooking_time: rand(10..120), # Random cooking time
          servings: rand(1..5),        # Random servings
          difficulty: [ "Easy", "Medium", "Hard" ].sample, # Random difficulty
          image_url: meal_data["strMealThumb"]
        )
      end
    end
    recipes
  end
end
