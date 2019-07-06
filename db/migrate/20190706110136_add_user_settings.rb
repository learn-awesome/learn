class AddUserSettings < ActiveRecord::Migration[5.2]
  def change
  	add_column :users, :random_fav_topic, :boolean, null: false, default: false
  	add_column :users, :random_fav_item_types, :string
  end
end
