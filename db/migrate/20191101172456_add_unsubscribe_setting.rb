class AddUnsubscribeSetting < ActiveRecord::Migration[6.0]
  def change
  	add_column :users, :unsubscribe, :boolean, null: false, default: false
  end
end
