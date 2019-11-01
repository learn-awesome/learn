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

require 'test_helper'

class UserUserRelationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
