class CreateFlashCards < ActiveRecord::Migration[6.0]
  def change
    create_table :flash_cards, id: :uuid do |t|
      t.references :user, null: false
      t.text :question, null: false
      t.text :answer, null: false
      t.integer :frequency, null: false, default: 1
      t.string :url, null: true
      t.timestamp :last_practised_at
      t.integer :practice_count
      t.timestamps
    end
  end
end
