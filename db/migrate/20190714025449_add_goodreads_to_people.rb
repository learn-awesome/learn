class AddGoodreadsToPeople < ActiveRecord::Migration[5.2]
  def change
  	add_column :people, :goodreads, :string
  end
end
