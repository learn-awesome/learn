class DecksController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?
  before_action :load_deck, only: [:show, :edit, :update, :destroy, :practice]

  def new
    @deck = current_user.decks.new
  end

  def create
    @deck = current_user.decks.new(deck_params)

    if @deck.save
      redirect_to @deck, notice: "Deck added successfully."
    else
      render :new
    end
  end

  def update
    if @deck.update(deck_params)
      redirect_to decks_path, notice: "Deck updated successfully."
    else
      render :edit
    end
  end

  def index
    @decks = current_user.decks

    render
  end

  def destroy
    @deck.destroy!
    redirect_to decks_path, notice: "Deck deleted successfully."
  end

  def show
  end

  def practice
    @flash_card = FlashCard.card_to_practice_next(current_user, @deck)
  end

  private

    def load_deck
      @deck = Deck.find(params[:id])
    end

    def deck_params
      params.require(:deck).permit(:name, :is_public)
    end

end
