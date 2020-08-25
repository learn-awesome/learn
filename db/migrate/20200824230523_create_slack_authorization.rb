class CreateSlackAuthorization < ActiveRecord::Migration[6.0]
  def change
    create_table :slack_authorizations, id: :uuid do |t|
      t.json :token, null: false

      t.timestamps
    end

    create_table :slack_subscriptions, id: :uuid do |t|
      t.references :slack_authorization, null: false, foreign_key: true, type: :uuid
      t.string :channel_id, null: false
      t.references :topic, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
