class AddThemeToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :theme, :string, null: true
  end
end
