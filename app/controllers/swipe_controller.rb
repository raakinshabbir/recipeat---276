class SwipeController < ApplicationController
  def index
    @recipes = Recipe.all
  end

  def show 
    @recipes = Recipe.find(params[:id])
  end

  def swipe_right
    recipe = Recipe.find(params[:id])
    liked_recipe = current_user.liked_recipes(recipe: recipe)

    if liked_recipe.save
      flash[:notice] = "Recipe liked!"
    else
      flash[:alert] = "Unable to like recipe"
    end

    redirect_to recipes_path
  end
end
