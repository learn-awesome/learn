class AddHasUsedEmbedReviewsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :has_used_embed, :boolean, null: false, default: false
  end
end
