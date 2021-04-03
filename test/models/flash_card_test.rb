# == Schema Information
#
# Table name: flash_cards
#
#  id                   :uuid             not null, primary key
#  question             :text             not null
#  answer               :text             not null
#  level                :integer          default(1), not null
#  url                  :string
#  last_practiced_at    :datetime
#  practice_count       :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  next_practice_due_at :datetime         not null
#  user_id              :uuid             not null
#  deck_id              :uuid             not null
#
require 'test_helper'

class FlashCardTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
