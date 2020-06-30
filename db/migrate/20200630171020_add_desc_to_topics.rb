class AddDescToTopics < ActiveRecord::Migration[6.0]
  def change
    add_column :topics, :description, :text, null: true
  end
end
