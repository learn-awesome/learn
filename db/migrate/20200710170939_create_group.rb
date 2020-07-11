class CreateGroup < ActiveRecord::Migration[6.0]
  def change
    create_table :groups, id: :uuid do |t|
      t.string :name, null: false
      t.text   :description, null: true
      t.string :image_url, null: true
      t.string :website_url, null: true
    end

    create_table :group_members, id: :uuid do |t|
      t.references :group, null: false, foreign_key: true, type: :uuid
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.string :role, null: false
      t.string :status, null: false
    end
  end
end
