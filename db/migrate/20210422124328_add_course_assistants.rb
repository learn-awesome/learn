class AddCourseAssistants < ActiveRecord::Migration[6.1]
  def change
    add_reference :courses, :first_assistant, foreign_key: { to_table: :users }, type: :uuid, null: true
    add_reference :courses, :second_assistant, foreign_key: { to_table: :users }, type: :uuid, null: true
    add_column :courses, :invite_msg, :text

    create_table :course_invite_codes, id: :uuid do |t|
      t.string :code, null: false
      t.text :description
      t.references :course, null: false, foreign_key: true, type: :uuid
      t.integer :max_limit, null: false, default: 1
      t.timestamps
    end

    add_index :course_invite_codes, [:course_id, :code], :unique => true

    add_column :user_levels, :invite_code, :string
  end
end
