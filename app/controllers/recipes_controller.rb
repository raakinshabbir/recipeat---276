class RecipesController < ApplicationController
    protect_from_forgery with: :null_session # Necessary for API calls without session verification
  
    def index
      @recipes = Recipe.limit(10)
      render json: @recipes
    end
  
    def create
      @recipe = Recipe.new(recipe_params)
        
      if params[:recipe][:photo]
        @recipe.photo.attach(params[:recipe][:photo])
      end  

      if @recipe.save
        render json: @recipe, status: :created
      else
        render json: @recipe.errors, status: :unprocessable_entity
      end
    end

    #Function to load more recipes once reaching end of swiper
    def load_more
      new_recipes = Recipe.fetch_new_recipes_from_api(10)

      # Render the new recipes as JSON
      render json: new_recipes.map { |recipe| recipe.slice(:id, :title, :ingredients, :instructions, :cooking_time, :servings, :difficulty, :image_url) }
    end

    def recipe_of_the_day
      # Fetch the cached recipe, or select a new one if none is cached or it expired
      @recipe_of_the_day = Rails.cache.fetch('recipe_of_the_day', expires_in: 24.hours) do
        Recipe.order("RANDOM()").first
      end
  
      respond_to do |format|
        format.html # Renders the HTML view
        format.json { render json: @recipe_of_the_day }
      end
    end

    def share
      @recipes = Recipe.all
    end

    def show
      @recipe = Recipe.find(params[:id])
    end
    
    private
  
    def recipe_params
      params.require(:recipe).permit(:name, :description, :origin, :steps, :photo)
    end
  end
  