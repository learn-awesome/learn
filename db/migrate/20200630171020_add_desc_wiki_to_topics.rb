class AddDescWikiToTopics < ActiveRecord::Migration[6.0]
  def change
    add_column :topics, :description, :text, null: true
    add_column :topics, :wiki_title, :string, null: true
  end
end
