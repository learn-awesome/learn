class FlashCardPracticeService
  attr_reader :user_id

  def initialize(user_id)
    @user_id = user_id
  end

  def card_to_practice_next
    FlashCard.of_user(user_id).least_practiced.past_due_for_practice.first
  end
end
