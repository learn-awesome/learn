# == Schema Information
#
# Table name: users
#
#  id          :uuid             not null, primary key
#  nickname    :string           not null
#  auth0_uid   :string           not null
#  authinfo    :text             not null
#  image_url   :string
#  bio         :string
#  description :text
#  score       :integer          default(100), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
