class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :item_types, id: :string do |t|
      t.string :display_name_plural
    end

    create_table :items, id: :uuid do |t|
      t.string :name, null: false
      t.references :item_type, foreign_key: true, null: false, type: :string
      t.integer :estimated_time
      t.string  :time_unit, null: false, default: 'minutes'
      t.integer :required_expertise
      t.references :idea_set, foreign_key: true, null: false, type: :uuid
      t.references :user, foreign_key: true, null: false, type: :uuid
      t.integer :year
      t.string :image_url
      t.integer :inspirational_score
      t.integer :educational_score
      t.integer :challenging_score
      t.integer :entertaining_score
      t.integer :visual_score
      t.integer :interactive_score

      t.timestamps
    end

  end
end
