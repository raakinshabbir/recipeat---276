class CreateLikedRecipes < ActiveRecord::Migration[7.2]
  def change
    create_table :liked_recipes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :recipe, null: false, foreign_key: true

      t.timestamps
    end
  end
end
