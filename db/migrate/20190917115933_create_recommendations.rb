class CreateRecommendations < ActiveRecord::Migration[6.0]
  def change
    create_table :recommendations, id: :uuid do |t|
      t.references :item, type: :uuid, null: false, foreign_key: true
      t.references :person, type: :uuid, null: false, foreign_key: true
      t.references :idea_set, type: :uuid, null: false, foreign_key: true
      t.text :metadata

      t.timestamps
    end
  end
end
