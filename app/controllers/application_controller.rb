class ApplicationController < ActionController::Base
  protected

  def filter_recipes(recipes)
    if params[:difficulty].present?
      recipes = recipes.where(difficulty: params[:difficulty])
    end

    if params[:cooking_time].present?
      recipes = recipes.where('cooking_time <= ?', params[:cooking_time])
    end

    if params[:unwanted_ingredients].present?
      unwanted_ingredients = params[:unwanted_ingredients].split(',').map(&:strip)
      unwanted_ingredients.each do |ingredient|
        recipes = recipes.where.not('ingredients LIKE ?', "%#{ingredient}%")
      end
    end

    recipes
  end
end
