class AddSlackRoomIdToTopics < ActiveRecord::Migration[6.0]
  def change
    add_column :topics, :slack_room_id, :string, null: true
  end
end
