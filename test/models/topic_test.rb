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
#  display_name :string
#  user_id      :uuid
#

require 'test_helper'

class TopicTest < ActiveSupport::TestCase
  test "search" do
    assert_equal Topic.search("first-topic").count, 1
  end

  test "advanced search" do
  	t = Topic.first
  	assert_equal t.advanced_search(nil,nil,nil), t.items
  end
end
