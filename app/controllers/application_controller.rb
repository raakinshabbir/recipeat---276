class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  protected

  def after_sign_in_path_for(resource)
    swipe_path # Or any other path
  end

  # Filtering logic for recipes
  private
  def filter_recipes(recipes)
  
    # Filter off difficulty
    recipes = recipes.where(difficulty: params[:difficulty]) if params[:difficulty].present?
    
    # Filter off cooking time
    recipes = recipes.where('cooking_time <= ?', params[:cooking_time]) if params[:cooking_time].present?

    # Filter out recipes with unwanted ingredients
    if params[:unwanted_ingredients].present?
      unwanted_ingredients = params[:unwanted_ingredients].split(',').map(&:strip).map(&:downcase)

      recipes = recipes.reject do |recipe|  
        recipe_ingredients = recipe.ingredients.downcase.split(',').map(&:strip)
        unwanted_ingredients.any? { |ingredient| recipe_ingredients.include?(ingredient) }
      end
    end 
    recipes
  end
end
