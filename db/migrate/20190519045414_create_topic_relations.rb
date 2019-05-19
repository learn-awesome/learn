class CreateTopicRelations < ActiveRecord::Migration[5.2]
  def change
    create_table :topic_relations, id: :uuid do |t|
      t.references :from, foreign_key: { to_table: :topics}, null: false, type: :uuid
      t.references :to, foreign_key: { to_table: :topics}, null: false, type: :uuid
      t.string :kind, null: false

      t.timestamps
    end
  end
end
