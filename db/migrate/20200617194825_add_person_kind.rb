class AddPersonKind < ActiveRecord::Migration[6.0]
  def change
    add_column :people, :kind, :string, null: true
    add_column :items, :page_count, :integer, null: true
    add_column :items, :goodreads_rating, :decimal, precision: 3, scale: 2, null: true
    add_column :items, :amazon_rating, :decimal, precision: 3, scale: 2, null: true
    add_column :items, :isbn, :string, null: true
    add_column :items, :isbn13, :string, null: true
    add_column :items, :cost, :decimal, precision: 8, scale: 2, null: true
    add_column :items, :language, :string, null: true
    add_column :items, :overall_score, :decimal, precision: 3, scale: 2, null: true

    change_column :items, :inspirational_score, :decimal, precision: 3, scale: 2, null: true
    change_column :items, :educational_score, :decimal, precision: 3, scale: 2, null: true
    change_column :items, :challenging_score, :decimal, precision: 3, scale: 2, null: true
    change_column :items, :entertaining_score, :decimal, precision: 3, scale: 2, null: true
    change_column :items, :visual_score, :decimal, precision: 3, scale: 2, null: true
    change_column :items, :interactive_score, :decimal, precision: 3, scale: 2, null: true
  end
end
