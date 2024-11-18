class SwipeController < ApplicationController
  def index
    @recipes = filter_recipes(Recipe.all)
    render 'swipe/index'  # Ensure you render the correct view
  end
  
end
