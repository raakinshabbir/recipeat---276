class LikedController < ApplicationController
    def index
      # Check if this is a JSON request (made by JavaScript)
      if request.format.json?
        liked_recipes = [
          { name: 'Spaghetti Carbonara', description: 'A delicious Italian pasta dish', photo_url: 'example1.jpg' },
          { name: 'Chicken Tacos', description: 'Tacos with a spicy chicken filling', photo_url: 'example2.jpg' },
          { name: 'Vegan Buddha Bowl', description: 'A healthy vegan dish with quinoa and veggies', photo_url: 'example3.jpg' }
        ]
  
        # Respond with JSON for the fetch request
        render json: liked_recipes
      else
        # Render the HTML view (index.html.erb)
        render :index
      end
    end
  
    def create
      recipe = Recipe.find(params[:recipe_id])
      liked_recipe = current_user.liked_recipes.build(recipe: recipe)
  
      if liked_recipe.save
        render json: { message: 'Recipe liked successfully', recipe_id: recipe.id }, status: :ok
      else
        render json: { error: 'Unable to like recipe' }, status: :unprocessable_entity
      end
    end
  end
  