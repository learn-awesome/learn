# == Schema Information
#
# Table name: slack_authorizations
#
#  id         :uuid             not null, primary key
#  token      :json             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class SlackAuthorization < ApplicationRecord
    has_many :slack_subscriptions

    def access_token
        self.token['access_token']
    end
end
