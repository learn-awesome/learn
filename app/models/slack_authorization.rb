class SlackAuthorization < ApplicationRecord
    has_many :slack_subscriptions

    def access_token
        self.token['access_token']
    end
end