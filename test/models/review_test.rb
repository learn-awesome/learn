# == Schema Information
#
# Table name: reviews
#
#  id                  :uuid             not null, primary key
#  user_id             :uuid             not null
#  item_id             :uuid             not null
#  status              :string           not null
#  inspirational_score :integer
#  educational_score   :integer
#  challenging_score   :integer
#  entertaining_score  :integer
#  visual_score        :integer
#  interactive_score   :integer
#  notes               :text
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

require 'test_helper'

class ReviewTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
