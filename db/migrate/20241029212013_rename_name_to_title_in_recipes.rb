class RenameNameToTitleInRecipes < ActiveRecord::Migration[7.2]
  def change
    rename_column :recipes, :name, :title
  end
end