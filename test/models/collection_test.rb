# == Schema Information
#
# Table name: collections
#
#  id          :uuid             not null, primary key
#  name        :string           not null
#  user_id     :uuid             not null
#  is_public   :boolean          default("false"), not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_collections_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

require 'test_helper'

class CollectionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
