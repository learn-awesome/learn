class ReviewReaction < ApplicationRecord
    belongs_to :user
    belongs_to :review

    KINDS = ['LIKE','COMMENT']

    validates_inclusion_of :kind, in: KINDS, allow_nil: false, allow_blank: false
    validates :user, presence: true
    validates :review, presence: true

    scope :recent, -> { order("created_at DESC").limit(10) }
end