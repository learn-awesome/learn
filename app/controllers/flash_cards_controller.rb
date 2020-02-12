class FlashCardsController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?

  def create
    @flash_card = build_resource
    @flash_card.user = current_user

    create!
  end

  private

    def flash_card_params
      params.require(:flash_card).permit(:question, :answer, :frequency, :last_practised_at)
    end

end
