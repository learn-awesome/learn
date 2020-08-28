class DailySlackAlertJob < ApplicationJob
  queue_as :default

  def perform(*args)
    return unless Rails.env.production?
    begin
      SlackSubscription.all.group_by(&:channel_id).each do |channel, subs|
        item = Item.discover(subs.map(&:topic))
        next if item.nil?
        item_url = Rails.application.routes.url_helpers.item_url(item)
        message = "Today's random item:  #{item.item_type} in #{item.topics.map(&:name).join(',')}: #{item.name}: #{item_url}"
        SlackSubscriptionNotifyJob.perform_now(message, subs.first.id)
      end
    rescue => exception
      Rails.logger.error "Error #{exception.message} DailySlackAlertJob"
    end
  end
end
