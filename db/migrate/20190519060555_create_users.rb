class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users, id: :uuid do |t|
      t.string :nickname
      t.string :auth0_uid
      t.text   :authinfo

      t.timestamps
    end
  end
end
