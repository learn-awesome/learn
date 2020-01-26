class UserPointsService < BaseService
	def initialize(user: , event: )
	  @user = user
	  @event = event
	end

	def call
	  add_event_score
	  user.save
	end

	private

	  attr_accessor :user, :event

    POINT_SYSTEM = {submission: 10, reviews: 10, referral: 50}

	  def add_event_score
	   user.score += POINT_SYSTEM[event]
	  end
end