class CreatePoems < ActiveRecord::Migration[5.2]
  def change
    create_table :poems do |t|
      t.string :title
      t.text :content
      t.string :audio_url
      t.integer :difficulty
      t.string :author_name

      t.timestamps
    end
  end
end
