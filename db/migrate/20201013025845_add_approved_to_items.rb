class AddApprovedToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :is_approved, :boolean, null: false, default: false
    Item.all.update_all(is_approved: true)
  end
end
