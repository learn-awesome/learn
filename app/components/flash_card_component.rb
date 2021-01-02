# frozen_string_literal: true

class FlashCardComponent < ViewComponent::Base
  def initialize(fid:)
    @fcard = FlashCard.find(fid)
  end
end
