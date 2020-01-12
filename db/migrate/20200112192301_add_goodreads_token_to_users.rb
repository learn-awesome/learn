class AddGoodreadsTokenToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :goodreads_token, :string, null: true
  end
end
