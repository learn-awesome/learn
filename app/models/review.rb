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
#  overall_score       :integer
#

require 'httparty'

class Review < ApplicationRecord
  belongs_to :user, inverse_of: :reviews
  belongs_to :item, inverse_of: :reviews

  after_save :update_item_ratings
  after_create :post_to_twitter

  SCORE_TYPES = [:inspirational_score, :educational_score, :challenging_score, :entertaining_score, :visual_score, :interactive_score]

  def update_item_ratings
  	SCORE_TYPES.each do |quality_score|
  		avg_score = self.item.reviews.where("#{quality_score} is not null").average(quality_score)
  		self.item.write_attribute(quality_score, avg_score.to_f) if avg_score
  		self.item.save
  	end
  end

  def post_to_twitter
    if self.user.is_from_twitter? && self.user.post_reviews_to_twitter
      if ENV.has_key?("TWITTER_CONSUMER_KEY") && ENV.has_key?("TWITTER_CONSUMER_SECRET")
        # PostReviewToTwitterJob.perform_later(self.user_id, self.id)
      end
    end
  end

  def as_json(options = {})
    {
      id: self.id,
      status: self.status,
      item_name: self.item.name,
      image_url: self.item.image_url,
      creators: self.item.creators,
      topics: self.item.topics.collect(&:name),
      item_type: self.item.item_type_id,
      notes: self.notes,
      inspirational_score: self.inspirational_score,
      educational_score: self.educational_score,
      challenging_score: self.challenging_score,
      entertaining_score: self.entertaining_score,
      visual_score: self.visual_score,
      interactive_score: self.interactive_score,
      updated_at: self.updated_at
    }
  end
end
