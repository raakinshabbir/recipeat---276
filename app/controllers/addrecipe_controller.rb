class AddrecipeController < ApplicationController
    def index
      @recipes = Recipe.all
      render json: @recipes
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