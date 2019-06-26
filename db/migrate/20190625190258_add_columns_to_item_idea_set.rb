class AddColumnsToItemIdeaSet < ActiveRecord::Migration[5.2]
  def change
  	add_column :idea_sets, :description, :text
  	add_column :items, :description, :text
  	add_column :items, :metadata, :json, null: false, default: '{}' # to store ISBN, goodreads id, doi etc
  	add_column :people, :metadata, :json, null: false, default: '{}' # to store goodreads id etc
  	add_column :topic_idea_sets, :rating, :integer # curated relevance score
  end
end
