class AddUniqueConstraintToLinks < ActiveRecord::Migration[6.0]
  def change
    add_index :links, :url, unique: true
  end
end
