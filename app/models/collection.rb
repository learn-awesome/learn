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

class Collection < ApplicationRecord
  belongs_to :user, inverse_of: :collections
  has_many :collection_items, dependent: :destroy
  has_many :items, through: :collection_items
  validates :name, presence: true, length: { in: 3..350 }
end
