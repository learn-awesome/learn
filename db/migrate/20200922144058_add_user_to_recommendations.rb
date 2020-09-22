class AddUserToRecommendations < ActiveRecord::Migration[6.0]
  def change
    add_column :recommendations, :user_id, :uuid, references: :user, foreign_key: true, null: true
  end
end
