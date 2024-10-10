class LikedController < ApplicationController
  before_action :authenticate_user!

  def index
    @liked_recipes = current_user.recipes

  end

  def create
    # Ensure the recipe_id is provided in the request
    recipe = Recipe.find(id: params[:recipe_id])

    if recipe.nil?
      render json: { error: 'Recipe not found' }, status: :not_found
      return
    end

    liked_recipe = current_user.liked_recipes.build(recipe: recipe)

    if liked_recipe.save
      render json: { message: 'Recipe liked successfully', recipe_id: recipe.id }, status: :ok
    else
      render json: { error: 'Unable to like recipe' }, status: :unprocessable_entity
    end
  end
end
