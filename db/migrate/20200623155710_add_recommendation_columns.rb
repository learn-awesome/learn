class AddRecommendationColumns < ActiveRecord::Migration[6.0]
  def change
    remove_column :recommendations, :item_id, :uuid
    add_column :recommendations, :item_id, :uuid, references: :item, foreign_key: true, null: true

    remove_column :recommendations, :person_id, :uuid
    add_column :recommendations, :person_id, :uuid, references: :person, foreign_key: true, null: true
    
    add_column :recommendations, :url, :string, null: true
    add_column :recommendations, :notes, :text, null: true
    add_column :recommendations, :score, :decimal, precision: 3, scale: 2, null: true
  end
end
