# == Schema Information
#
# Table name: collections
#
#  id          :uuid             not null, primary key
#  name        :string           not null
#  user_id     :uuid             not null
#  is_public   :boolean          default(FALSE), not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class CollectionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
