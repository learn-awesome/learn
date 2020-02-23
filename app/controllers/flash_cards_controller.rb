class FlashCardsController < ApplicationController
  include Secured
  before_action :logged_in_using_omniauth?
  before_action :load_flash_card, only: [:edit, :update, :destroy, :did_recall, :did_not_recall]

  def create
    @flash_card = current_user.flash_cards.new(flash_card_params)
    @flash_card.level ||= 1

    if @flash_card.save
      redirect_to flash_cards_path, notice: "Flash card added successfully."
    else
      render :new
    end
  end

  def new
    @flash_card = current_user.flash_cards.new
    @flash_card.url = params[:url] unless params[:url].blank?
    @flash_card.question = params[:question] unless params[:question].blank?
    @flash_card.answer = params[:answer] unless params[:answer].blank?

    render
  end

  def edit
    render
  end

  def update
    if @flash_card.update(flash_card_params)
      redirect_to flash_cards_path, notice: "Flash card updated successfully."
    else
      render :edit
    end
  end

  def index
    @flash_cards = current_user.flash_cards

    render
  end

  def destroy
    @flash_card.destroy!
    redirect_to flash_cards_path, notice: "Flash card deleted successfully."
  end

  def practice
    @flash_card = FlashCard.card_to_practice_next(current_user)

    render
  end

  def did_recall
    render json: @flash_card.did_recall
  end

  def did_not_recall
    render json: @flash_card.did_not_recall
  end

  private

    def load_flash_card
      @flash_card = FlashCard.find(params[:id])
    end

    def flash_card_params
      params.require(:flash_card).permit(:question, :answer, :url, :level, :last_practised_at)
    end

end
