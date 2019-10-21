class AllowReviewStatusNull < ActiveRecord::Migration[6.0]
  def up
  	change_column :reviews, :status, :string, null: true
  end

  def down
  	change_column :reviews, :status, :string, null: false
  end
end
