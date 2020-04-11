class AddConstraints < ActiveRecord::Migration[6.0]
  def up
      # add a CHECK constraint for not allowing a user to follow or rate themselves
      execute <<-SQL
        ALTER TABLE user_user_relations
          ADD CONSTRAINT reject_self_reference
            CHECK (from_user_id != to_user_id);
      SQL

      remove_index :user_topics, column: [:user_id, :by_user_id, :action], unique: true
      remove_reference :user_topics, :by_user, foreign_key: { to_table: :users }, type: :uuid

      add_index(:user_topics, [:user_id, :topic_id, :action], unique: true, name: 'uniq_user_topic_action')
      add_index(:user_user_relations, [:from_user_id, :to_user_id, :action], unique: true, name: 'uniq_from_to_action')

      remove_column :user_topics, :value, :integer, null: true
  end
      
  def down
      execute <<-SQL
        ALTER TABLE user_user_relations
          DROP CONSTRAINT IF EXISTS reject_self_reference
      SQL

      add_reference :user_topics, :by_user, foreign_key: { to_table: :users }, type: :uuid
      add_index(:user_topics, [:user_id, :by_user_id, :action], unique: true, name: 'uniq_user_byuser_action')
      
      remove_index :user_topics, name: 'uniq_user_topic_action'
      remove_index :user_user_relations, name: 'uniq_from_to_action'

      add_column :user_topics, :value, :integer, null: true
  end
end
