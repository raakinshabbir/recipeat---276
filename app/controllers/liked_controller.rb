class LikedController < ApplicationController
    def index
      @liked_recipes = current_user.liked_recipes.includes(:recipe)

      respond_to do |format|
        format.html { render :liked } # renders liked.html.erb
        format.json { render json: @liked_recipes.map { |lr| lr.recipe } }
      end
    end
  
    def create
      recipe = Recipe.find(params[:recipe_id])
      liked_recipe = current_user.liked_recipes.build(recipe: recipe)
  
      if liked_recipe.save
        render json: { message: 'Recipe liked successfully', recipe_id: recipe.id }, status: :ok
      else
        render json: { error: 'Unable to like recipe' }, status: :unprocessable_entity
      end
    end

    def destroy
      recipe = Recipe.find(params[:recipe_id])
      liked_recipe = current_user.liked_recipes.find_by(recipe: recipe)
  
      if liked_recipe.destroy
        render json: { message: 'Recipe unliked successfully', recipe_id: recipe.id }, status: :ok
      else
        render json: { error: 'Unable to unlike recipe' }, status: :unprocessable_entity
      end
    
    end
end
  