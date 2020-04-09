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
# Indexes
#
#  index_topic_relations_on_from_id  (from_id)
#  index_topic_relations_on_to_id    (to_id)
#
# Foreign Keys
#
#  fk_rails_...  (from_id => topics.id)
#  fk_rails_...  (to_id => topics.id)
#

require 'test_helper'

class TopicRelationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
