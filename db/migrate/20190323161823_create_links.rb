class CreateLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :links, id: :uuid do |t|
      t.string :url, null: false, unique: true
      t.references :item, foreign_key: true, null: false, type: :uuid

      t.timestamps
    end
  end
end
