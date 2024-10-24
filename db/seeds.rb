require 'faker'

# Clear all existing recipes before seeding
Recipe.delete_all

# Helper function to generate random ingredients with measurements
def generate_ingredients(ingredient_count = 5)
  ingredients = []
  ingredient_count.times do
    ingredient = Faker::Food.ingredient
    measurement = Faker::Food.measurement
    ingredients << "#{measurement} of #{ingredient}"
  end
  ingredients
end

# Helper function to generate instructions using the ingredients
def generate_instructions(ingredients)
  "Prepare the following ingredients: #{ingredients.join(', ')}. " \
  "Cook everything according to the dish's cooking time, and make sure to stir often."
end

# Seed 10 random recipes with consistent data
10.times do
  dish_name = Faker::Food.dish
  ingredients = generate_ingredients(rand(3..7)) # 3 to 7 random ingredients
  instructions = generate_instructions(ingredients)

  Recipe.create!(
    title: dish_name,
    ingredients: ingredients.join(', '), # Join ingredients into a single string
    instructions: instructions,
    cooking_time: rand(10..60),           # Random cooking time
    servings: rand(1..6),                 # Random servings
    difficulty: [ 'Easy', 'Medium', 'Hard' ].sample # Random difficulty level
  )
end

puts "Recipes seeded successfully with consistent ingredients and instructions."
