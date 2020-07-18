class DailyEmailBatchJob < ApplicationJob
    queue_as :default
  
    def perform(batch_index)
        # Send daily email to users
        # Items added to their favorite topics
        # New followers

        # TODO: Change 7.day to 1.day once we automate this job

        new_global_users = User.where("created_at > ?", Time.now.beginning_of_day - 7.day)
        new_items = Item.where("created_at > ?", Time.now.beginning_of_day - 7.day).limit(5)

        User.order("created_at ASC").in_groups_of(50)[batch_index].each do |u|
            next if u.nil? || u.email.blank?
            begin
                new_fav_items = TopicIdeaSet.where(topic: u.fav_topics).where("created_at > ?", Time.now.beginning_of_day - 7.day)
                new_followers = u.followers.where("user_user_relations.created_at > ?", Time.now.beginning_of_day - 7.day)
                new_global_users_except_me = new_global_users.reject { |v| v.id == u.id }

                unless new_fav_items.blank? and new_followers.blank? and new_global_users_except_me.blank? and new_items.blank?
                  Rails.logger.info "Sending daily email to #{u.email}"
                  UserMailer.with(
                      user: u,
                      new_followers: new_followers,
                      new_fav_items: new_fav_items,
                      new_global_users: new_global_users_except_me,
                      new_items: new_items
                  ).daily_email.deliver_now
                end
            rescue Exception => ex
                Rails.logger.error("#{ex.message} in DailyEmailJob for #{u.id} #{u.nickname}")
            end
        end
        puts "Processed batch #{batch_index}"
    end
end