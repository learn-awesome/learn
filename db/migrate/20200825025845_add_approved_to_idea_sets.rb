class AddApprovedToIdeaSets < ActiveRecord::Migration[6.0]
  def change
    add_column :idea_sets, :is_approved, :boolean, null: false, default: false
  end
end
