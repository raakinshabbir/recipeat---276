# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# In db/seeds.rb
require 'net/http'
require 'json'

#clear the current recipes
Recipe.delete_all

# Function to fetch and save recipes
def fetch_recipes_from_api
  url = URI("https://www.themealdb.com/api/json/v1/1/search.php?s=")
  response = Net::HTTP.get(url)
  recipes_data = JSON.parse(response)["meals"]

  recipes_data.each do |meal|
    Recipe.create(
      title: meal["strMeal"],
      ingredients: meal["strIngredient1"], # Adjust this based on actual API format
      instructions: ["strInstructions"],
      cooking_time: rand(10..120),  # Random or calculated time
      servings: rand(1..5),         # Random serving size
      difficulty: ["Easy", "Medium", "Hard"].sample,
      image_url: meal["strMealThumb"]
    )
  end
end


# Run the API fetch function
fetch_recipes_from_api
