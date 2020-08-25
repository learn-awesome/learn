class SlackSubscription < ApplicationRecord
    belongs_to :slack_authorization
    belongs_to :topic

    validates_presence_of :channel_id
end