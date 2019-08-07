class AddScoreAndByToUserTopicRelation < ActiveRecord::Migration[5.2]
  def change
  	add_column :user_topics, :value, :integer, null: true
  	add_reference :user_topics, :by_user, foreign_key: { to_table: :users }, type: :uuid
  	add_index :user_topics, [:user_id, :by_user_id, :action], unique: true
  end
end
