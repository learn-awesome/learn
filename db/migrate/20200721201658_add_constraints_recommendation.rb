class AddConstraintsRecommendation < ActiveRecord::Migration[6.0]
  def change
    add_index :recommendations, [:person_id, :idea_set_id], unique: true, where: 'person_id IS NOT NULL'
    add_index :recommendations, [:item_id, :idea_set_id], unique: true, where: 'item_id IS NOT NULL'
    add_index :people, :name, unique: true
  end
end
