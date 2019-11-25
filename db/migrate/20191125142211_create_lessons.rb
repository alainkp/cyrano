class CreateLessons < ActiveRecord::Migration[5.2]
  def change
    create_table :lessons do |t|
      t.integer :reading_progression
      t.integer :listening_progression
      t.references :user, foreign_key: true
      t.references :poem, foreign_key: true

      t.timestamps
    end
  end
end
