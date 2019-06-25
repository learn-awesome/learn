class CreateUserUserRelations < ActiveRecord::Migration[5.2]
  def change
    create_table :user_user_relations, id: :uuid do |t|
      t.references :from_user, index: true, foreign_key: {to_table: :users}, null: false, type: :uuid
      t.references :to_user, index: true, foreign_key: {to_table: :users}, null: false, type: :uuid
      t.string :action, null: false, default: "follow"
      t.timestamps
    end
  end
end
