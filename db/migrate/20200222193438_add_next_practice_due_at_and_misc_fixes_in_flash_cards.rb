class AddNextPracticeDueAtAndMiscFixesInFlashCards < ActiveRecord::Migration[6.0]
  def change
    add_column :flash_cards, :next_practice_due_at, :datetime, null: false, default: -> { 'CURRENT_TIMESTAMP' }
    rename_column :flash_cards, :last_practised_at, :last_practiced_at

    # IMPORTANT NOTE: Since the original "flash_cards" table was created with
    # an incorrect "user_id" column type (i.e. integer instead of an uuid),
    # SAFELY assuming that this table is NOT used anywhere yet; and therefore,
    # following is the only way I believe it can be properly fixed with.
    add_column :flash_cards, :user_uuid, :uuid, null: false
    remove_column :flash_cards, :user_id, :uuid
    rename_column :flash_cards, :user_uuid, :user_id
    add_foreign_key :flash_cards, :users, column: :user_id
  end
end
