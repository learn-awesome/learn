class FlashCard < ApplicationRecord
    validates :question, length: { in: 6..2000 }
    validates :answer, length: { in: 1..200 }
    validates :frequency, inclusion: { in: %w(a b c d e f g h i j k) }
    validates :user, presence: true

    belongs_to :user
end
