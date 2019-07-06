class CreateTopics < ActiveRecord::Migration[5.2]
  def change
    create_table :topics, id: :uuid do |t|
      t.string :name, null: false, index: { unique: true }
      t.string :search_index, null: false
      t.string :namespace
      t.string :gitter_room

      t.timestamps
    end
  end
end
