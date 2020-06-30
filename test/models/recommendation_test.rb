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
#
# Indexes
#
#  index_recommendations_on_idea_set_id  (idea_set_id)
#
# Foreign Keys
#
#  fk_rails_...  (idea_set_id => idea_sets.id)
#

require 'test_helper'

class RecommendationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
