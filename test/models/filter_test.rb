require 'test_helper'

class FilterTest < ActiveSupport::TestCase
  def setup
    @recipe1 = Recipe.create(title: 'Pasta', difficulty: 'Easy', cooking_time: 15, ingredients: 'Eggs, Flour')
    @recipe2 = Recipe.create(title: 'Salad', difficulty: 'Medium', cooking_time: 10, ingredients: 'Lettuce, Tomato')
    @recipe3 = Recipe.create(title: 'Soup', difficulty: 'Hard', cooking_time: 30, ingredients: 'Chicken, Carrot')
  end

  def teardown 
    Recipe.destroy_all
  end 
  
  test 'filter recipes by difficulty - difficulty Easy' do
    filtered_recipes = Recipe.where(difficulty: 'Easy')
    assert_includes filtered_recipes, @recipe1
    assert_not_includes filtered_recipes, @recipe2
    assert_not_includes filtered_recipes, @recipe3
  end

  test 'filter recipes by difficulty - difficulty Medium' do
    filtered_recipes = Recipe.where(difficulty: 'Medium')
    assert_not_includes filtered_recipes, @recipe1
    assert_includes filtered_recipes, @recipe2
    assert_not_includes filtered_recipes, @recipe3
  end

  test 'filter recipes by difficulty - difficulty Hard' do
    filtered_recipes = Recipe.where(difficulty: 'Hard')
    assert_not_includes filtered_recipes, @recipe1
    assert_not_includes filtered_recipes, @recipe2
    assert_includes filtered_recipes, @recipe3
  end

  test 'filter recipes by cooking time - (>= 0 mins)' do
    filtered_recipes = Recipe.where('cooking_time <= ?', 20) # can swap 20 with any time >= 0
    assert_includes filtered_recipes, @recipe1
    assert_includes filtered_recipes, @recipe2
    assert_not_includes filtered_recipes, @recipe3
  end


  test 'filter recipes by unwanted ingredients - Egg present' do
    unwanted_ingredients = ['Eggs']
    filtered_recipes = Recipe.all.reject do |recipe|
      recipe_ingredients = recipe.ingredients.downcase.split(',').map(&:strip)
      unwanted_ingredients.any? { |ingredient| recipe_ingredients.include?(ingredient.downcase) }
    end
    assert_not_includes filtered_recipes, @recipe1
    assert_includes filtered_recipes, @recipe2
    assert_includes filtered_recipes, @recipe3
  end

  test 'filter recipes by unwanted ingredients - Lentils absent' do
    unwanted_ingredients = ['Lentils']
    filtered_recipes = Recipe.all.reject do |recipe|
      recipe_ingredients = recipe.ingredients.downcase.split(',').map(&:strip)
      unwanted_ingredients.any? { |ingredient| recipe_ingredients.include?(ingredient.downcase) }
    end
    asset_includes filtered_recipes, @recipe1
    assert_includes filtered_recipes, @recipe2
    assert_includes filtered_recipes, @recipe3
  end
end
