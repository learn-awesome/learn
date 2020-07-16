class AddReactions < ActiveRecord::Migration[6.0]
  def change
    create_table :review_reactions, id: :uuid do |t|
      t.string :kind, null: false
      t.text   :body, null: true
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :review, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end

    create_table :item_reactions, id: :uuid do |t|
      t.string :kind, null: false
      t.text   :body, null: true
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :item, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end

    create_table :topic_reactions, id: :uuid do |t|
      t.string :kind, null: false
      t.text   :body, null: true
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :topic, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
