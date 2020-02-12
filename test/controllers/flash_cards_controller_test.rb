require 'test_helper'

class FlashCardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @flash_card = flash_cards(:one)
  end

  test "should get index" do
    get flash_cards_url
    assert_response :success
  end

  test "should get new" do
    get new_flash_card_url
    assert_response :success
  end

  test "should create flash_card" do
    assert_difference('FlashCard.count') do
      post flash_cards_url, params: { flash_card: { answer: @flash_card.answer, frequency: @flash_card.frequency, last_practised_at: @flash_card.last_practised_at, question: @flash_card.question, user: @flash_card.user } }
    end

    assert_redirected_to flash_card_url(FlashCard.last)
  end

  test "should show flash_card" do
    get flash_card_url(@flash_card)
    assert_response :success
  end

  test "should get edit" do
    get edit_flash_card_url(@flash_card)
    assert_response :success
  end

  test "should update flash_card" do
    patch flash_card_url(@flash_card), params: { flash_card: { answer: @flash_card.answer, frequency: @flash_card.frequency, last_practised_at: @flash_card.last_practised_at, question: @flash_card.question, user: @flash_card.user } }
    assert_redirected_to flash_card_url(@flash_card)
  end

  test "should destroy flash_card" do
    assert_difference('FlashCard.count', -1) do
      delete flash_card_url(@flash_card)
    end

    assert_redirected_to flash_cards_url
  end
end
