class RecipesController < ApplicationController
  def index
    @recipes = Recipe.all
    @random_recipe = @recipes.sample
  end
end
