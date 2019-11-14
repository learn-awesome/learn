class ActivityPubFollowAcceptedJob < ApplicationJob
  queue_as :default

  def perform(activity_pub_follower_id)
    begin
      apf = ActivityPubFollower.find(activity_pub_follower_id)
      apf.accept_follow_request!
    rescue Exception => ex
      Rails.logger.error "Error #{ex.message} in ActivityPubFollowAcceptedJob for #{activity_pub_follower_id}"
    end
  end
end
