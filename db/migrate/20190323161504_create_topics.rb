class CreateTopics < ActiveRecord::Migration[5.2]
  def change
    create_table :topics, id: :uuid do |t|
      t.string :name, null: false, unique: true

      t.timestamps
    end
  end
end
