class FlashCard < ApplicationRecord
    validates :question, length: { in: 6..2000 }
    validates :answer, length: { in: 1..200 }
    validates :frequency, inclusion: { in: 1..11 }
    validates :user, presence: true

    scope :for_user, ->(user) { where(user: user) }
    scope :least_practiced, -> { order(:next_practice_due_at, :practice_count, :last_practiced_at, :frequency) }
    scope :past_due_for_practice, -> { where("next_practice_due_at <= ?", Time.current) }

    belongs_to :user

    def did_recall
        self.frequency += 1
        self.last_practiced_at = Time.now
        self.set_next_practice_due_at_on_successful_recall
        self.save!
        FlashCard.next(self.user)
    end

    def did_not_recall
        self.frequency = 1
        self.last_practiced_at = Time.now
        self.set_next_practice_due_at_on_failed_recall
        self.save!
        FlashCard.next(self.user)
    end

    private

    # When a flash card is recalled successfully, its frequency gets elevated.
    # Thus, we also double the # of days required until its next practice due.
    #
    # For an example, if the 'frequency' is elevated
    #   - to 2 then 'next_practice_due_at' is set to 2 days from now
    #   - to 3 then 'next_practice_due_at' is set to 4 days from now
    #   - to 4 then 'next_practice_due_at' is set to 8 days from now
    #   - to 5 then 'next_practice_due_at' is set to 16 days from now
    #   - to 6 then 'next_practice_due_at' is set to 32 days from now
    #   - and so on...
    def set_next_practice_due_at_on_successful_recall
        self.next_practice_due_at = Time.current + ( 2 ** (self.frequency - 1)).days
    end

    # When a flash card is NOT recalled successfully, its frequency gets reset.
    # Thus, we set its next practice due to 1 second past from now
    # so that it can be practiced again.
    def set_next_practice_due_at_on_failed_recall
        self.next_practice_due_at = Time.current - 1.second
    end

    # Note that this method can return a nil response which means there are
    # no eligible flash cards available for practice at this moment.
    def self.next(user)
        FlashCard.for_user(user).least_practiced.past_due_for_practice.first
    end
end
