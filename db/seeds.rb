# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Recipe.create(
  title: "Scrambled Eggs",
  ingredients: "Eggs, Butter, Salt, Pepper",
  instructions: "1. Whisk eggs. 2. Melt butter in a pan. 3. Pour eggs into pan. 4. Stir gently until fully cooked.",
  cooking_time: "10 minutes",
  servings: 2,
  difficulty: "Easy"
)

Recipe.create(
  title: "Cajun Chicken",
  ingredients: "Chicken Breasts, Cajun Seasoning, Olive Oil, Garlic, Lemon",
  instructions: "1. Rub chicken with seasoning. 2. Heat oil in pan. 3. Cook chicken until golden and fully cooked.",
  cooking_time: "30 minutes",
  servings: 4,
  difficulty: "Medium"
)

Recipe.create(
  title: "Pasta Carbonara",
  ingredients: "Spaghetti, Eggs, Parmesan, Pancetta, Black Pepper",
  instructions: "1. Boil pasta. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Toss with pasta and pancetta.",
  cooking_time: "20 minutes",
  servings: 4,
  difficulty: "Medium"
)

Recipe.create(
  title: "Chocolate Cake",
  ingredients: "Flour, Sugar, Cocoa Powder, Eggs, Butter, Baking Powder",
  instructions: "1. Mix dry ingredients. 2. Add eggs and butter. 3. Bake in oven for 30 minutes.",
  cooking_time: "45 minutes",
  servings: 8,
  difficulty: "Hard"
)

# Create some sample recipes
recipe1 = Recipe.create(name: 'Spaghetti Carbonara', description: 'A delicious Italian pasta dish.', photo_url: 'example1.jpg')
recipe2 = Recipe.create(name: 'Chicken Tacos', description: 'Tacos with a spicy chicken filling.', photo_url: 'example2.jpg')
recipe3 = Recipe.create(name: 'Vegan Buddha Bowl', description: 'A healthy vegan dish with quinoa and veggies.', photo_url: 'example3.jpg')

# Create a sample user (Make sure you have a User model and any necessary validations)
user = User.create(email: 'jaden.chan54@gmail.com', password: 'cmpt276')

# Create liked recipes for the user
LikedRecipe.create(user: user, recipe: recipe1)
LikedRecipe.create(user: user, recipe: recipe2)
LikedRecipe.create(user: user, recipe: recipe3)