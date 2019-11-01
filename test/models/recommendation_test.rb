# == Schema Information
#
# Table name: recommendations
#
#  id          :uuid             not null, primary key
#  item_id     :uuid             not null
#  person_id   :uuid             not null
#  idea_set_id :uuid             not null
#  metadata    :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class RecommendationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
