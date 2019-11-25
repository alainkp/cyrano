class CreateRecites < ActiveRecord::Migration[5.2]
  def change
    create_table :recites do |t|
      t.integer :progression
      t.integer :duration
      t.references :lesson, foreign_key: true

      t.timestamps
    end
  end
end
