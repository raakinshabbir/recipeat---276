class AddrecipeController < ApplicationController
  def index
    @recipes = Recipe.all
    # Render the HTML view instead of JSON
    # This will look for app/views/addrecipe/index.html.erb
    render :index
  end

  def create
    recipe = Recipe.new(recipe_params)
    if recipe.save
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :description, :origin, :instructions, :image)
  end
end
