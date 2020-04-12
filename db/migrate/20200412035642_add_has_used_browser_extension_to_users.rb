class AddHasUsedBrowserExtensionToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :has_used_browser_extension, :boolean, null: false, default: false
    remove_column :users, :goodreads_token, :string, null: true
  end
end
