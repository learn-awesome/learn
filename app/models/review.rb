# == Schema Information
#
# Table name: reviews
#
#  id                        :uuid             not null, primary key
#  user_id                   :uuid             not null
#  item_id                   :uuid             not null
#  status                    :string
#  inspirational_score       :integer
#  educational_score         :integer
#  challenging_score         :integer
#  entertaining_score        :integer
#  visual_score              :integer
#  interactive_score         :integer
#  notes                     :text
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  overall_score             :integer
#  is_posted_on_social_media :boolean          default(FALSE)
#

require 'httparty'

class Review < ApplicationRecord
  belongs_to :user, inverse_of: :reviews
  belongs_to :item, inverse_of: :reviews

  validates_inclusion_of :status, in: ['want_to_learn', 'learning', 'learned'], allow_nil: true, allow_blank: false

  after_save :update_item_ratings
  after_save :post_to_twitter

  scope :completed, -> { where("notes IS NOT NULL or overall_score IS NOT NULL") }
  scope :recent, -> { order("created_at DESC").limit(10) }
  scope :popular, -> { order("overall_score DESC").limit(10) }

  SCORE_TYPES = [:inspirational_score, :educational_score, :challenging_score, :entertaining_score, :visual_score, :interactive_score]
  STATUSES = {want_to_learn: "Want to learn", learning: "Currently learning", learned: "Already learned"}

  def update_item_ratings
  	SCORE_TYPES.each do |quality_score|
  		avg_score = self.item.reviews.where("#{quality_score} is not null").average(quality_score)
  		self.item.write_attribute(quality_score, avg_score.to_f) if avg_score
  		self.item.save
  	end
  end

  def post_to_twitter
    return unless Rails.env.production?
    return if self.is_posted_on_social_media
    return unless self.user.is_from_twitter?
    return unless self.user.post_reviews_to_twitter
    return if self.overall_score.nil? and self.notes.blank? # neither star ratings nor notes are given

    if ENV.has_key?("TWITTER_CONSUMER_KEY") && ENV.has_key?("TWITTER_CONSUMER_SECRET")
      # wait a while so that users can complete his review notes
      PostReviewToTwitterJob.set(wait: 30.minutes).perform_later(self.id)
    end
  end

  def tags_text
    SCORE_TYPES.select { |s| self.read_attribute(s).to_i >= 4 }.map { |s| s.to_s.sub("_score", "") }.join(", ")
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

  def self.display_rating(score)
    return "" if score.nil?
    ("⭐" * score.to_i) + ("☆" * (5 - score.to_i))
  end

  def display_rating
    Review.display_rating(self.overall_score)
  end

  def rating_msg
    return "" if self.overall_score.nil?
    return "#{self.overall_score.to_i} out of 5 stars"
  end

  def display_title
    self.user.nickname + "'s review for " + self.item.display_name
  end

  def self.discover
    Review.order('RANDOM()').first
  end

  def og_image
    return self.item.image_url if self.item.image_url.present?
    if self.item.thumbnail.present?
      if self.item.thumbnail.start_with?("/icons")
        return "https://learnawesome.org#{self.item.thumbnail}"
      else
        return self.item.thumbnail
      end
    end
    return self.user.avatar_image if self.user.avatar_image.present?
    return "https://learnawesome.org/stream/assets/img/ogimage.png"
  end

  def og_description
    self.notes.to_s[0..100] + " ... see more at LearnAwesome.org :: Humanity's universal learning map"
  end

  def tweet_msg
    url = Rails.application.routes.url_helpers.review_url(self)

    if self.rating_msg.blank?
      return "Just reviewed #{self.item.display_name}. See my detailed review at #{url}"
    else
      return "#{self.display_rating} #{self.rating_msg} to #{self.item.display_name}. See my detailed review at #{url}"
    end
  end
end
