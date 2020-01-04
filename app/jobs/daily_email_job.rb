class DailyEmailJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # TODO: Send daily email to users
    # Items added to their favorite topics
    # New followers

    User.all.each do |u|
      new_fav_items = TopicIdeaSet.where(topic: u.fav_topics).where("created_at > ?", Time.now.beginning_of_day - 1.day)
      new_followers = u.followers.where("user_user_relations.created_at > ?", Time.now.beginning_of_day - 1.day)

      UserMailer.with(user: u, new_followers: new_followers, new_fav_items: new_fav_items).daily_email.deliver_now
    end
  end
end
