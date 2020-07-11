class AddUniqueIndexToGroupMember < ActiveRecord::Migration[6.0]
  def change
  	add_index :group_members, [:group_id, :user_id], unique: true
  end
end
