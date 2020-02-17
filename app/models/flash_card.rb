class FlashCard < ApplicationRecord
    validates :question, length: { in: 6..2000 }
    validates :answer, length: { in: 1..200 }
    validates :frequency, inclusion: { in: 1..11 }
    validates :user, presence: true

    belongs_to :user

    def did_recall
        self.frequency += 1
        self.last_practiced_at = Time.now
        self.save!
        FlashCard.sample(self.user)
    end

    def did_not_recall
        self.frequency = 1
        self.last_practiced_at = Time.now
        self.save!
        FlashCard.sample(self.user)
    end

    def self.sample(user)
        #TODO: Implement spaced-repetition strategy
        user.flash_cards.sample
    end
end
