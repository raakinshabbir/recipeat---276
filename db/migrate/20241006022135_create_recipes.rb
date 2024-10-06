class CreateRecipes < ActiveRecord::Migration[7.2]
  def change
    create_table :recipes do |t|
      t.string :title
      t.text :ingredients
      t.text :instructions
      t.integer :cooking_time
      t.integer :servings
      t.text :difficulty

      t.timestamps
    end
  end
end
