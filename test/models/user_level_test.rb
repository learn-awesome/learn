# == Schema Information
#
# Table name: user_levels
#
#  id         :uuid             not null, primary key
#  user_id    :uuid             not null
#  course_id  :uuid             not null
#  level_id   :uuid             not null
#  answer     :text
#  status     :string           not null
#  feedback   :text
#  metadata   :json
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "test_helper"

class UserLevelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
