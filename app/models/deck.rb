class Deck < ApplicationRecord
  validates :name, length: {in: 4..80}
  validates :user, presence: true

  scope :of_user, ->(user_id) { where(user_id: user_id) }
  belongs_to :user
  has_many :flash_cards

end
