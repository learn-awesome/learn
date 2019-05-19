class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :item_types, id: :string do |t|
    end

    create_table :items, id: :uuid do |t|
      t.string :name, null: false
      t.references :item_type, foreign_key: true, null: false, type: :string
      t.integer :estimated_time
      t.integer :required_expertise
      t.references :idea_set, foreign_key: true, null: false, type: :uuid

      t.timestamps
    end

  end
end
