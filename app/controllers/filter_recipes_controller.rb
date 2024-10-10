class FilterRecipesController < ApplicationController
  def index
     # Fetch all recipes or filter based on user input
     @recipes = Recipe.all
     @recipes = @recipes.where(difficulty: params[:difficulty]) if params[:difficulty].present?
     @recipes = @recipes.where('cooking_time <= ?', params[:cooking_time]) if params[:cooking_time].present?

    # Debug filtered recipes
    # Filter out recipes with unwanted ingredients
    if params[:unwanted_ingredients].present?
      unwanted_ingredients = params[:unwanted_ingredients].split(',').map(&:strip).map(&:downcase)

      @recipes = @recipes.reject do |recipe|
        recipe_ingredients = recipe.ingredients.downcase.split(',').map(&:strip)
        unwanted_ingredients.any? { |ingredient| recipe_ingredients.include?(ingredient) }
      end
    end 
    Rails.logger.debug "Filtered Recipes: #{@recipes.pluck(:title)}"
  end
end
