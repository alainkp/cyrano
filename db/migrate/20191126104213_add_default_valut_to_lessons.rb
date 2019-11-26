class AddDefaultValutToLessons < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:lessons, :reading_progression, 0)
    change_column_default(:lessons, :listening_progression, 0)
  end
end
