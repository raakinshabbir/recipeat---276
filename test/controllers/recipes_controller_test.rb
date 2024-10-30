require 'test_helper'

class RecipesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @recipe1 = Recipe.create(title: 'Pasta', ingredients: 'Noodles, Sauce', instructions: 'Boil noodles', cooking_time: 20)
    @recipe2 = Recipe.create(title: 'Salad', ingredients: 'Lettuce, Dressing', instructions: 'Mix ingredients', cooking_time: 5)
  end

  test 'should get recipe_of_the_day' do
    get recipe_of_the_day_path, as: :json
    assert_response :success
    assert_includes [@recipe1, @recipe2], assigns(:recipe_of_the_day)
  end

  test 'should render template for HTML' do
    get recipe_of_the_day_path
    assert_template :recipe_of_the_day
  end
end
