class AddrecipeController < ApplicationController
  def new
    @recipe = Recipe.new
  end

  def create
    @recipe = Recipe.new(recipe_params)

    # Attach the photo if it's present in the params
    if params[:recipe][:photo]
      @recipe.photo.attach(params[:recipe][:photo])
    end

    if @recipe.save
      redirect_to @recipe, notice: 'Recipe was successfully added.'
    else
      render :new
    end
  end

  def show
    @recipe = Recipe.find(params[:id])
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :ingredients, :instructions, :cooking_time, :servings, :difficulty, :photo)
  end
end