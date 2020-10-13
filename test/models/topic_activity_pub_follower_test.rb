# == Schema Information
#
# Table name: topic_activity_pub_followers
#
#  id         :uuid             not null, primary key
#  topic_id   :uuid             not null
#  metadata   :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'test_helper'

class TopicActivityPubFollowerTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
