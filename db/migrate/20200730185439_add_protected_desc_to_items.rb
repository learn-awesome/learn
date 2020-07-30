class AddProtectedDescToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :protected_description, :text, null: true
  end
end
