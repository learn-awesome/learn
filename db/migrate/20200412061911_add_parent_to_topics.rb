class AddParentToTopics < ActiveRecord::Migration[6.0]
  def change
    add_reference :topics, :parent, foreign_key: {to_table: :topics}, type: :uuid, null: true
    add_column :topics, :image_url, :string, null: true
  end
end
