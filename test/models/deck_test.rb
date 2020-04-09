# == Schema Information
#
# Table name: decks
#
#  id          :uuid             not null, primary key
#  name        :string
#  user_id     :uuid             not null
#  is_public   :boolean          default("false"), not null
#  description :string
#  image_url   :string
#  tags        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_decks_on_user_id           (user_id)
#  index_decks_on_user_id_and_name  (user_id,name) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'test_helper'

class DeckTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
