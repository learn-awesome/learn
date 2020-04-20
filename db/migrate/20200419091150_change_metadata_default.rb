class ChangeMetadataDefault < ActiveRecord::Migration[6.0]
  def change
  	change_column :items, :metadata, :json, null: false, default: {} # to store ISBN, goodreads id, doi etc
  	change_column :people, :metadata, :json, null: false, default: {} # to store goodreads id etc
  end
end
