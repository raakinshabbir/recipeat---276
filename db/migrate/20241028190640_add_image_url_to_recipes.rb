class AddImageUrlToRecipes < ActiveRecord::Migration[7.2]
  def change
    add_column :recipes, :image_url, :string
  end
end
