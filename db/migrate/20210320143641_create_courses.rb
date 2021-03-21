class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses, id: :uuid do |t|
      t.string :name, null: false
      t.text :description
      t.string :image_url
      t.references :topic, null: false, foreign_key: true, type: :uuid
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.integer :cost, null: false

      t.timestamps
    end
  end
end
