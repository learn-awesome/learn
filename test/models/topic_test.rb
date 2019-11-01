# == Schema Information
#
# Table name: topics
#
#  id           :uuid             not null, primary key
#  name         :string           not null
#  search_index :string           not null
#  gitter_room  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class TopicTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
