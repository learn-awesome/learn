# == Schema Information
#
# Table name: topics
#
#  id               :uuid             not null, primary key
#  name             :string           not null
#  search_index     :string           not null
#  gitter_room      :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  display_name     :string
#  user_id          :uuid
#  parent_id        :uuid
#  second_parent_id :uuid
#  image_url        :string
#  gitter_room_id   :string
#  description      :text
#
# Indexes
#
#  index_topics_on_name              (name) UNIQUE
#  index_topics_on_parent_id         (parent_id)
#  index_topics_on_second_parent_id  (second_parent_id)
#  index_topics_on_user_id           (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (parent_id => topics.id)
#  fk_rails_...  (second_parent_id => topics.id)
#  fk_rails_...  (user_id => users.id)
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
