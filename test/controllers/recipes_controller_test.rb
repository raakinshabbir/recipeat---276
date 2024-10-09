require "test_helper"

class RecipesControllerTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end
  def index
    @recipe = Recipe.all
    render json: @recipe
  end

  def create
    @Recipe = Recipe.new(recipe_params)
    @recipe.photo.attach(params[:photo]) if params[:photo]

    if @recipe.save
      render json: @recipe, status: :created
    else
      render json: { errors: @recipe.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private

  def recipe_params
    params.require(:recipe).permit(:title, :description, :instructions, :photo)
  end
end
