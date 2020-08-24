# == Schema Information
#
# Table name: topic_relations
#
#  id         :uuid             not null, primary key
#  from_id    :uuid             not null
#  to_id      :uuid             not null
#  kind       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class TopicRelationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
