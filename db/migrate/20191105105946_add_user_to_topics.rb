class AddUserToTopics < ActiveRecord::Migration[6.0]
  def change
  	add_column :topics, :display_name, :string, null: true
  	add_reference :topics, :user, type: :uuid, null: true
  	add_foreign_key :topics, :users
  end
end
