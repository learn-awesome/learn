class Level < ApplicationRecord
  belongs_to :course
  belongs_to :item_type
  has_many :user_levels

  validates :seq, uniqueness: { scope: :course, message: "must be unique" }
end
