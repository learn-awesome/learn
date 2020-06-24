class AddPrivateNotesToReviews < ActiveRecord::Migration[6.0]
  def change
    add_column :reviews, :private_notes, :text, null: true
  end
end
