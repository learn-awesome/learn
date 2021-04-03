# == Schema Information
#
# Table name: decks
#
#  id          :uuid             not null, primary key
#  name        :string
#  user_id     :uuid             not null
#  is_public   :boolean          default(FALSE), not null
#  description :string
#  image_url   :string
#  tags        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'test_helper'

class DeckTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
