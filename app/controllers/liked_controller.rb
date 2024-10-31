class LikedController < ApplicationController
  before_action :authenticate_user!

  def index
    @liked_recipes = current_user.liked_recipes.includes(:recipe)
    logger.info "Loaded liked recipes:"
    @liked_recipes.each do |lr|
      logger.info "Recipe ID: #{lr.recipe.id}, Recipe Title: #{lr.recipe.title}"
    end
  end

  def swipe_right
    recipe = Recipe.find_by(id: params[:id])

    if recipe.nil?
      flash[:alert] = "Recipe not found"
      redirect_to recipes_path
      return
    end

    liked_recipe = current_user.liked_recipes.build(recipe: recipe)

    if liked_recipe.save
      render json: { success: true, message: "Recipe liked!" }, status: :ok
    else
      render json: { success: false, message: "Unable to like recipe" }, status: :unprocessable_entity
    end
    redirect_to recipes_path
  end

end
