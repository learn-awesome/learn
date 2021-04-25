class DropActiveAdminTables < ActiveRecord::Migration[6.1]
  def up
    drop_table :active_admin_comments
    drop_table :admin_users
  end

  def down
    Rails.logger.error "Don't know how to undelete tables"
  end
end
