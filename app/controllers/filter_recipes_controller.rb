class FilterRecipesController < ApplicationController
  def index
    @recipes = filter_recipes(Recipe.all)
  end
end
