# == Schema Information
#
# Table name: user_user_relations
#
#  id           :uuid             not null, primary key
#  from_user_id :uuid             not null
#  to_user_id   :uuid             not null
#  action       :string           default("follow"), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_user_user_relations_on_from_user_id  (from_user_id)
#  index_user_user_relations_on_to_user_id    (to_user_id)
#
# Foreign Keys
#
#  fk_rails_...  (from_user_id => users.id)
#  fk_rails_...  (to_user_id => users.id)
#

require 'test_helper'

class UserUserRelationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
