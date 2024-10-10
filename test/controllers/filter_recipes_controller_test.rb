require "test_helper"

class FilterRecipesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get filter_recipes_index_url
    assert_response :success
  end
end
