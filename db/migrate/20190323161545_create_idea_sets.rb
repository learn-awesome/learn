class CreateIdeaSets < ActiveRecord::Migration[5.2]
  def change
    create_table :idea_sets, id: :uuid do |t|
      t.string :name, null: false, unique: true

      t.timestamps
    end

    create_table :topic_idea_sets, id: :uuid do |t|
    	t.references :topic, foreign_key: true, null: false, type: :uuid
    	t.references :idea_set, foreign_key: true, null: false, type: :uuid
    	t.timestamps
    end
  end
end
