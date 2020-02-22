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

  after_create :update_points
  after_save :update_item_ratings
  after_save :post_to_social_media
  after_save :change_status

  scope :completed, -> { where("notes IS NOT NULL or overall_score IS NOT NULL") }
  scope :recent, -> { order("created_at DESC").limit(10) }
  scope :popular, -> { order("overall_score DESC").limit(10) }

  SCORE_TYPES = [:inspirational_score, :educational_score, :challenging_score, :entertaining_score, :visual_score, :interactive_score]
  STATUSES = {want_to_learn: "Want to learn", learning: "Currently learning", learned: "Already learned"}

  SAMPLE_COMMENTS = {
    app: [
      "Really cool app!"
    ],
    article: [
      "Enjoyed reading it!"
    ],
    audio: [],
    blog: [
      "Very insightful"
    ],
    book: [
      "Loved reading this"
    ],
    cert: [],
    chat: [
      "Nice community"
    ],
    cheatsheet: [
      "Really good"
    ],
    code: [
      "Well, this is clever :-)"
    ],
    conference: [
      "I wish something like this existed in my area"
    ],
    course: [
      "Had been hearing good things about this course. Finally checked it out."
    ],
    flashcard: [],
    game: [
      "Quite fun!"
    ],
    image: [],
    interactive: [
      "Awesome way to learn"
    ],
    journal: [],
    learning_plan: [
      "This is put together very well"
    ],
    livestream: [
      "One of the best streams on this topic!"
    ],
    meetup: [
      "I went to this event. Ran into some cool folks."
    ],
    newsletter: [
      "Consistently insightful",
      "Great ways to stay updated on this topic"
    ],
    people: [
    ],
    qna: [
      "The definitive place to go to for Q&A on this topic. The community is quite helpful."
    ],
    research_paper: [
      "Highly recommended",
      "This gets cited a lot!",
      "One of the classics!"
    ],
    summary: [
      "Nice summary of the main ideas",
      "Saved me a lot of time :-)"
    ],
    video: [
      "A good watch!"
    ],
    website: [
      "Very useful site"
    ],
    wiki: [
      "Has some good references."
    ]
  }

  def self.sample_reviews(item, exclude_user = nil)
    [2,3,2,3,4].sample.times.map {
      Review.new(
        user: User.where.not(id: [exclude_user.try(:id), User.learnawesome.id].compact).order('RANDOM()').first,
        notes: SAMPLE_COMMENTS[item.item_type_id.to_sym].try(:sample),
        overall_score: [3,4,5].sample,
        created_at: (Time.now - rand(5..90).days - rand(1..23).hours - rand(1..50).minutes),
        inspirational_score: rand(1..5),
        educational_score: rand(1..5),
        challenging_score: rand(1..5),
        entertaining_score: rand(1..5),
        visual_score: rand(1..5),
        interactive_score: rand(1..5)
      )
    }.uniq(&:user_id)
  end

  def update_item_ratings
  	SCORE_TYPES.each do |quality_score|
  		avg_score = self.item.reviews.where("#{quality_score} is not null").average(quality_score)
  		self.item.write_attribute(quality_score, avg_score.to_f) if avg_score
  		self.item.save
  	end
  end

  def update_points
    UserPointsService.call(self.user)
  end

  def change_status
    # if self.overall_score.present? and self.status.nil?
    #   self.status = 'learned'
    #   self.save
    # end
  end

  def post_to_social_media
    return unless Rails.env.production?
    return if self.is_posted_on_social_media

    PostReviewToSocialMediaJob.set(wait: 30.minutes).perform_later(self.id)
  end

  def activity_pub_message
    url = Rails.application.routes.url_helpers.review_url(self)

    if self.rating_msg.blank?
      return "I just reviewed #{self.item.display_name} (#{self.item.item_type_id} for #{self.item.topics.map(&:name).join(',')}). <a href='#{url}' target='_blank'>See my detailed review</a>."
    else
      return "#{self.display_rating} #{self.rating_msg} to #{self.item.display_name} (#{self.item.item_type_id} for #{self.item.topics.map(&:name).join(',')}). <a href='#{url}' target='_blank'>See my detailed review</a>."
    end
  end

  def activity_pub
    {
      "@context": "https://www.w3.org/ns/activitystreams",

      "id": "https://learnawesome.org/post-review-activity-pub/#{self.id}",
      "type": "Create",
      "actor": Rails.application.routes.url_helpers.actor_user_url(self.user),

      "object": {
        "id": "https://learnawesome.org/review-activity-pub/#{self.id}",
        "type": "Note",
        "published": self.created_at.iso8601,
        "attributedTo": Rails.application.routes.url_helpers.actor_user_url(self.user),
        # "inReplyTo": "https://mastodon.social/@Gargron/100254678717223630",
        "content": self.activity_pub_message,
        "to": "https://www.w3.org/ns/activitystreams#Public"
      }
    }
  end

  def post_activity_pub(follower)
    document = self.activity_pub
    full_inbox = follower.inbox
    date = Time.now.utc.httpdate

    signature_header = ActivityPub.sign(
      Rails.application.routes.url_helpers.actor_user_url(self.user),
      URI.parse(full_inbox).path,
      URI.parse(full_inbox).host,
      date,
      ENV['ACTIVITYPUB_PRIVKEY'].to_s
    )

    HTTParty.post(full_inbox,
      body: document.to_json, 
      headers: { 'Date': date, 'Signature': signature_header , 'Content-Type': 'application/json'}
    )
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

  def goodreads_msg
    url = Rails.application.routes.url_helpers.review_url(self)

    if self.rating_msg.blank?
      return "Just reviewed #{self.item.display_name}. See my detailed review at #{url}"
    else
      return "#{self.display_rating} #{self.rating_msg} to #{self.item.display_name}. See my detailed review at #{url}"
    end
  end
end
