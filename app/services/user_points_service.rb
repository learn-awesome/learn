class UserPointsService < BaseService

  def initialize(user)
    @user = user
  end

  def call
  	reset_score
    add_event_scores
    add_special_scores

    user.save!
  end

  private

  	attr_accessor :user

    POINT_SYSTEM = { submission: 10, reviews: 10, referral: 50 }

    def add_event_scores
    	user.score += user.submissions.count * POINT_SYSTEM[:submission]
    	user.score += user.reviews.count * POINT_SYSTEM[:reviews]
    	user.score += user.invited.count * POINT_SYSTEM[:referral]
    end

    def add_special_scores
    	user.score += 5000 if User.core_devs.include? user.id
    	user.score += 5000 if ['58175aad-22f9-4a40-a6d0-b665762c8f8d'].include? user.id
    	user.score += 10_000 if Rails.env.development? && User.order(:created_at).take(5).map(&:id).include?(user.id)
    	user.score += [('2019-12-31'.to_date - user.created_at.to_date).to_i, 0].max
    end

    def reset_score
    	user.score = 0
    end
end