require 'rails_helper'

RSpec.describe LikedController, type: :controller do
  let(:user) { create(:user) }
  let(:recipe) { create(:recipe) }

  before do
    sign_in user
  end

  describe 'POST #create' do
    it 'successfully likes a recipe' do
      post :create, params: { recipe_id: recipe.id }
      
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['message']).to eq('Recipe liked successfully')
      expect(user.liked_recipes.count).to eq(1)
    end

    it 'prevents duplicate likes' do
      user.liked_recipes.create(recipe: recipe)
      post :create, params: { recipe_id: recipe.id }
      
      expect(response).to have_http_status(:unprocessable_entity)
      expect(user.liked_recipes.count).to eq(1)
    end
  end

  describe 'DELETE #destroy' do
    it 'successfully unlikes a recipe' do
      user.liked_recipes.create(recipe: recipe)
      delete :destroy, params: { recipe_id: recipe.id }
      
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['message']).to eq('Recipe unliked successfully')
      expect(user.liked_recipes.count).to eq(0)
    end
  end
end