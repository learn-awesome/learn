# == Schema Information
#
# Table name: reviews
#
#  id                  :uuid             not null, primary key
#  user_id             :uuid             not null
#  item_id             :uuid             not null
#  status              :string           not null
#  inspirational_score :integer
#  educational_score   :integer
#  challenging_score   :integer
#  entertaining_score  :integer
#  visual_score        :integer
#  interactive_score   :integer
#  notes               :text
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

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
