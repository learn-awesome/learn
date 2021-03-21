class CreateUserLevels < ActiveRecord::Migration[6.1]
  def change
    create_table :user_levels, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :course, null: false, foreign_key: true, type: :uuid
      t.references :level, null: false, foreign_key: true, type: :uuid
      t.text :answer
      t.string :status, null: false
      t.text :feedback
      t.json :metadata

      t.timestamps
    end
  end
end
