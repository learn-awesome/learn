class CreatePeople < ActiveRecord::Migration[5.2]
  def change
    create_table :people, id: :uuid do |t|
      t.string :name, null: false
      t.text   :description
      t.string :website
      t.string :email
      t.string :twitter

      t.timestamps
    end

    create_table :person_idea_sets, id: :uuid do |t|
    	t.references :person, foreign_key: true, null: false, type: :uuid
    	t.references :idea_set, foreign_key: true, null: false, type: :uuid
    	t.string :role
    	t.timestamps
    end
  end
end
