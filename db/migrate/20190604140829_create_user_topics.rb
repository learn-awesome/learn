class CreateUserTopics < ActiveRecord::Migration[5.2]
  def change
    create_table :user_topics, id: :uuid do |t|
      t.references :user, foreign_key: true, type: :uuid, null: false
      t.references :topic, foreign_key: true, type: :uuid, null: false
      t.string :action, null: false

      t.timestamps
    end
  end
end
