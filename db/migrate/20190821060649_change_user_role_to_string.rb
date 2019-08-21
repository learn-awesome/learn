class ChangeUserRoleToString < ActiveRecord::Migration[6.0]
  def up
  	change_column :users, :role, :string, null: false, default: "regular"
  	User.where("role = '0'").update_all("role = 'regular'")
  end

  def down
  	change_column_default( :users, :role, from: "regular", to: nil )
  	User.where("role = 'regular'").update_all("role = '0'")
  	change_column :users, :role, :integer, using: 'role::integer', default: 0, null: false
  end
end
