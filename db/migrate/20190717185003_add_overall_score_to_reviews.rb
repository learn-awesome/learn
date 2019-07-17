class AddOverallScoreToReviews < ActiveRecord::Migration[5.2]
  def change
  	add_column :reviews, :overall_score, :integer
  end
end
