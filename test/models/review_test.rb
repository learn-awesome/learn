# == Schema Information
#
# Table name: reviews
#
#  id                        :uuid             not null, primary key
#  user_id                   :uuid             not null
#  item_id                   :uuid             not null
#  status                    :string
#  inspirational_score       :integer
#  educational_score         :integer
#  challenging_score         :integer
#  entertaining_score        :integer
#  visual_score              :integer
#  interactive_score         :integer
#  notes                     :text
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  overall_score             :integer
#  is_posted_on_social_media :boolean          default("false")
#
# Indexes
#
#  index_reviews_on_item_id              (item_id)
#  index_reviews_on_user_id              (user_id)
#  index_reviews_on_user_id_and_item_id  (user_id,item_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (item_id => items.id)
#  fk_rails_...  (user_id => users.id)
#

require 'test_helper'

class ReviewTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
