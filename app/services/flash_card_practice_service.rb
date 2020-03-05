class FlashCardPracticeService
  attr_reader :user
  attr_reader :deck

  def initialize(user, deck = nil)
    @user = user
    @deck = deck
  end

  def card_to_practice_next
    # practice across all decks or a single deck
    (deck || user).flash_cards.least_practiced.past_due_for_practice.first
  end
end
