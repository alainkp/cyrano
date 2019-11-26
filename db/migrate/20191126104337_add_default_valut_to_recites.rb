class AddDefaultValutToRecites < ActiveRecord::Migration[5.2]
  def change
    change_column_default(:recites, :progression, 0)
  end
end
