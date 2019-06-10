class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users, id: :uuid do |t|
      t.string :nickname, null: false
      t.string :auth0_uid, null: false
      t.text   :authinfo, null: false
      t.string :image_url
      t.string :bio
      t.text   :description
      t.integer :score, null: false, default: 100
      t.integer :role, null: false, default: "regular"

      t.timestamps
    end
  end
end
