class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews, id: :uuid do |t|
      t.references :user, foreign_key: true, type: :uuid, null: false
      t.references :item, foreign_key: true, type: :uuid, null: false
      t.string :status, null: false
      t.integer :inspirational_score
      t.integer :educational_score
      t.integer :challenging_score
      t.integer :entertaining_score
      t.integer :visual_score
      t.integer :interactive_score
      t.text :notes

      t.timestamps
    end
  end
end
