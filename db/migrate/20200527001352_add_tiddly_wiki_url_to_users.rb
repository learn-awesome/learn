class AddTiddlyWikiUrlToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :tiddlywiki_url, :string, null: true
  end
end
