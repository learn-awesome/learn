class FiveStarComponent < ViewComponent::Base

    def initialize(review:)
      @review = review
    end

    def render?
      @review.user
    end
  end