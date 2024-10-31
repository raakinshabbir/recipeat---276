class FixRecipesTable < ActiveRecord::Migration[7.2]
  def change
    # change_table :recipes do |t|
      # Rename columns back to the original names
      # t.rename :description, :ingredients
      # t.rename :steps, :instructions
      # t.rename :origin, :cooking_time
      
      # Add back the removed columns
      # t.integer :servings
      # t.string :difficulty
    #end
  end
end
