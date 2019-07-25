class AddTwitterPostSettings < ActiveRecord::Migration[5.2]
  def change
  	add_column :users, :post_reviews_to_twitter, :boolean, null: false, default: false
  end
end
