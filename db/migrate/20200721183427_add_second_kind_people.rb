class AddSecondKindPeople < ActiveRecord::Migration[6.0]
  def change
    add_column :people, :second_kind, :string, null: true
    add_column :people, :wikipedia_url, :string, null: true
  end
end
