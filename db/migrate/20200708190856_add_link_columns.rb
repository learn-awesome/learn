class AddLinkColumns < ActiveRecord::Migration[6.0]
  def change
    add_column :links, :name, :string, null: true
    add_column :links, :is_primary, :boolean, null: true
  end
end
