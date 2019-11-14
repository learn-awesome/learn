class CreateActivityPubFollowers < ActiveRecord::Migration[6.0]
  def change
    create_table :activity_pub_followers, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.text :metadata, null: false

      t.timestamps
    end
  end
end
