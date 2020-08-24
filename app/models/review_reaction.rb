# == Schema Information
#
# Table name: review_reactions
#
#  id         :uuid             not null, primary key
#  kind       :string           not null
#  body       :text
#  user_id    :uuid             not null
#  review_id  :uuid             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class ReviewReaction < ApplicationRecord
    belongs_to :user
    belongs_to :review

    KINDS = ['LIKE','COMMENT']

    validates_inclusion_of :kind, in: KINDS, allow_nil: false, allow_blank: false
    validates :user, presence: true
    validates :review, presence: true

    scope :recent, -> { order("created_at DESC").limit(10) }
end
