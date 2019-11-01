class AddTwitterPostedFlagToReviews < ActiveRecord::Migration[6.0]
  def change
  	add_column :reviews, :is_posted_on_social_media, :boolean, null: true, default: false
  end
end
