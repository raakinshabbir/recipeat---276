# In db/seeds.rb
require 'net/http'
require 'json'

# Clear existing recipes
Recipe.delete_all

#Fetch initial batch of recipes
Recipe.fetch_new_recipes_from_api
