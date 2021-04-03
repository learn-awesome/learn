# == Schema Information
#
# Table name: levels
#
#  id            :uuid             not null, primary key
#  name          :string           not null
#  description   :text
#  course_id     :uuid             not null
#  seq           :integer          not null
#  item_type_id  :string
#  link          :string
#  answer_type   :string           not null
#  answer_prompt :text             not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require "test_helper"

class LevelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
