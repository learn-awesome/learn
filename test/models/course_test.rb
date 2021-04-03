# == Schema Information
#
# Table name: courses
#
#  id          :uuid             not null, primary key
#  name        :string           not null
#  description :text
#  image_url   :string
#  topic_id    :uuid             not null
#  user_id     :uuid             not null
#  cost        :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  score       :integer          default(0)
#
require "test_helper"

class CourseTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
