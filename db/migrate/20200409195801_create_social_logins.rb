class CreateSocialLogins < ActiveRecord::Migration[6.0]
  def up
    create_table :social_logins, id: :uuid do |t|
      t.string :auth0_uid
      t.json :auth0_info
      t.boolean :post_reviews, default: true, null: false
      t.references :user, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end

    User.all.each do |u|
      next if u.auth0_uid.blank?
      u.social_logins.create!(auth0_uid: u.auth0_uid, auth0_info: u.authinfo)
    end

    remove_columns :users, :auth0_uid, :authinfo, :post_reviews_to_twitter
  end

  def down
    add_column :users, :auth0_uid, :string, null: true
    add_column :users, :authinfo, :text, null: true
    add_column :users, :post_reviews_to_twitter, :boolean, null: false

    drop_table :social_logins
  end
end
