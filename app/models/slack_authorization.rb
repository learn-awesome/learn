class SlackAuthorization < ApplicationRecord
    has_many :slack_subscriptions
end