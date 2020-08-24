class SlackSubscription < ApplicationRecord
    belongs_to :slack_authorization
    belongs_to :topic
end