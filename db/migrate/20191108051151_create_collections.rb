class CreateCollections < ActiveRecord::Migration[5.2]
  def change
    create_table :collections, id: :uuid do |t|
      t.string :name, null: false
      t.references :user, foreign_key: true, null: false, type: :uuid
      t.boolean :is_public, null: false, default: false
      t.text :description
      t.timestamps
    end

    create_table :collection_items, id: :uuid do |t|
      t.references :collection, foreign_key: true, null: false, type: :uuid
      t.references :item, foreign_key: true, null: false, type: :uuid
      t.timestamps
    end
  end
end
