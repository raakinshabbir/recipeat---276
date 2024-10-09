class CreateLikeds < ActiveRecord::Migration[7.2]
  def change
    create_table :likeds do |t|
      t.timestamps
    end
  end
end
