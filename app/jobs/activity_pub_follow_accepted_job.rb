class ActivityPubFollowAcceptedJob < ApplicationJob
  queue_as :default

  def perform(activity_pub_follower_id)
  	apf = ActivityPubFollower.find(activity_pub_follower_id)
  	apf.accept_follow_request	
  end
end