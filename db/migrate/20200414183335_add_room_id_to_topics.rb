class AddRoomIdToTopics < ActiveRecord::Migration[6.0]
  def change
    add_column :topics, :gitter_room_id, :string, null: true
  end
end
