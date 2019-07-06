class AddReferrerToUser < ActiveRecord::Migration[5.2]
  def change
  	add_column :users, :referrer, :string
  end
end
