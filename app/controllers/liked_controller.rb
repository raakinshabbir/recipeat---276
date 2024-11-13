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
      if current_user.liked_recipes.find_by(recipe: recipe)
        render json: { message: 'Recipe already liked', recipe_id: recipe.id }, status: :unprocessable_entity
        return
      end
      
      liked_recipe = current_user.liked_recipes.build(recipe: recipe)
  
      if liked_recipe.save
        render json: { message: 'Recipe liked successfully', recipe_id: recipe.id }, status: :ok
      else
        render json: { error: 'Unable to like recipe' }, status: :unprocessable_entity
      end
    end

    def destroy
      begin
        recipe = Recipe.find(params[:recipe_id])

        result = ActiveRecord::Base.connection.execute(
          "DELETE FROM liked_recipes 
          WHERE user_id = #{current_user.id} 
          AND recipe_id = #{recipe.id}"
        )

      if result
        render json: { message: 'Recipe unliked successfully', recipe_id: recipe.id }, status: :ok
      else
        render json: { error: 'Unable to unlike recipe' }, status: :unprocessable_entity
      end
      rescue => e
        render json: { error: "Delete failed: #{e.message}" }, status: :unprocessable_entity
      end
    
    end
end
  