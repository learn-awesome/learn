class CreateThings < ActiveRecord::Migration[5.2]
  def change
    create_table :things, id: :uuid do |t|
      t.string :name, null: false, unique: true

      t.timestamps
    end

    create_table :topic_things, id: :uuid do |t|
    	t.references :topic, foreign_key: true, null: false, type: :uuid
    	t.references :thing, foreign_key: true, null: false, type: :uuid
    	t.timestamps
    end
  end
end
