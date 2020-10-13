# == Schema Information
#
# Table name: recommendations
#
#  id          :uuid             not null, primary key
#  idea_set_id :uuid             not null
#  metadata    :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  item_id     :uuid
#  person_id   :uuid
#  url         :string
#  notes       :text
#  score       :decimal(3, 2)
#  user_id     :uuid
#

require 'test_helper'

class RecommendationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
