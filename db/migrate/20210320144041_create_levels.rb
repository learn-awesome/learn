class CreateLevels < ActiveRecord::Migration[6.1]
  def change
    create_table :levels, id: :uuid do |t|
      t.string :name, null: false
      t.text :description
      t.references :course, null: false, foreign_key: true, type: :uuid
      t.integer :seq, null: false
      t.references :item_type, null: false, foreign_key: true, type: :string
      t.string :link
      t.string :answer_type, null: false
      t.text :answer_prompt, null: false

      t.timestamps
    end
  end
end
