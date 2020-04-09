# == Schema Information
#
# Table name: flash_cards
#
#  id                   :uuid             not null, primary key
#  question             :text             not null
#  answer               :text             not null
#  level                :integer          default("1"), not null
#  url                  :string
#  last_practiced_at    :datetime
#  practice_count       :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  next_practice_due_at :datetime         not null
#  user_id              :uuid             not null
#  deck_id              :uuid             not null
#
# Indexes
#
#  index_flash_cards_on_deck_id  (deck_id)
#
# Foreign Keys
#
#  fk_rails_...  (deck_id => decks.id)
#  fk_rails_...  (user_id => users.id)
#
require 'test_helper'

class FlashCardTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
