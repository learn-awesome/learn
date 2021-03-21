class AddRocketchatTokenUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :rocketchat_logintoken, :string
  end
end
