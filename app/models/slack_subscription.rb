# == Schema Information
#
# Table name: slack_subscriptions
#
#  id                     :uuid             not null, primary key
#  slack_authorization_id :uuid             not null
#  channel_id             :string           not null
#  topic_id               :uuid             not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
class SlackSubscription < ApplicationRecord
    belongs_to :slack_authorization
    belongs_to :topic

    validates_presence_of :channel_id

    def access_token
        self.slack_authorization.access_token
    end
end
