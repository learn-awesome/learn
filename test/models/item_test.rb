# == Schema Information
#
# Table name: items
#
#  id                  :uuid             not null, primary key
#  name                :string           not null
#  item_type_id        :string           not null
#  estimated_time      :integer
#  required_expertise  :integer
#  idea_set_id         :uuid             not null
#  user_id             :uuid             not null
#  year                :integer
#  inspirational_score :integer
#  educational_score   :integer
#  challenging_score   :integer
#  entertaining_score  :integer
#  visual_score        :integer
#  interactive_score   :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

require 'test_helper'

class ItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
