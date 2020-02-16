class FlashCardsController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?

  def create
    @flash_card = build_resource
    @flash_card.user = current_user

    create!
  end

  def new
    @flash_card = build_resource
    @flash_card.url = params[:url] unless params[:url].blank?
    @flash_card.question = params[:question] unless params[:question].blank?
    @flash_card.answer = params[:answer] unless params[:answer].blank?

    new!
  end

  private

    def flash_card_params
      params.require(:flash_card).permit(:question, :answer, :frequency, :last_practised_at)
    end

end
