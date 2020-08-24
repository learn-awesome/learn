# == Schema Information
#
# Table name: user_topics
#
#  id         :uuid             not null, primary key
#  user_id    :uuid             not null
#  topic_id   :uuid             not null
#  action     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class UserTopicTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
