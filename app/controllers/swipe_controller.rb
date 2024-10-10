class SwipeController < ApplicationController
  def index
    @recipes = filter_recipes(Recipe.all)
  end

  def show 
    @recipe = Recipe.find(params[:id])
  end 
end