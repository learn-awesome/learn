class ActivityPubFollowAcceptedJob < ApplicationJob
  queue_as :default

  def perform(activity_pub_follower_id, model_type)
    begin
      if model_type == 'topic'
        apf = TopicActivityPubFollower.find(activity_pub_follower_id)
      else # 'user'
        apf = ActivityPubFollower.find(activity_pub_follower_id)
      end
      apf.accept_follow_request!
    rescue Exception => ex
      Rails.logger.error "Error #{ex.message} in ActivityPubFollowAcceptedJob for #{activity_pub_follower_id}"
    end
  end
end
