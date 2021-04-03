# == Schema Information
#
# Table name: social_logins
#
#  id           :uuid             not null, primary key
#  auth0_uid    :string
#  auth0_info   :json
#  post_reviews :boolean          default(TRUE), not null
#  user_id      :uuid             not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
require 'test_helper'

class SocialLoginTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
