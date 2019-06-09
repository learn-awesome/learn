class Review < ApplicationRecord
  belongs_to :user
  belongs_to :item

  after_save :update_item_ratings

  def update_item_ratings
  	[:inspirational_score, :educational_score, :challenging_score, :entertaining_score, :visual_score, :interactive_score].each do |quality_score|
  		avg_score = self.item.reviews.where("#{quality_score} is not null").average(quality_score)
  		self.item.write_attribute(quality_score, avg_score.to_f) if avg_score
  		self.item.save
  	end
  end
end
