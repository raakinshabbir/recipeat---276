# In db/seeds.rb
require 'net/http'
require 'json'

# Clear existing recipes
Recipe.delete_all

# Function to fetch and save a random meal
def fetch_random_recipe
  url = URI("https://www.themealdb.com/api/json/v1/1/random.php")
  response = Net::HTTP.get(url)
  meal_data = JSON.parse(response)["meals"]&.first # Get the first meal object

  return unless meal_data # Exit if no meal data

  Recipe.create(
    title: meal_data["strMeal"],
    ingredients: meal_data["strIngredient1"], # Adjust as needed to include all ingredients
    instructions: meal_data["strInstructions"],
    cooking_time: rand(10..120),  # Random or calculated time
    servings: rand(1..5),         # Random serving size
    difficulty: [ "Easy", "Medium", "Hard" ].sample,
    image_url: meal_data['strMealThumb']
  )
end

# Fetch multiple random recipes
10.times do
  fetch_random_recipe
end
