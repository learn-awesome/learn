class AddFollowersCountToTopics < ActiveRecord::Migration[6.0]
  def change
    add_column :topics, :followers_count, :integer
  end
end
