require "application_system_test_case"

class FlashCardsTest < ApplicationSystemTestCase
  setup do
    @flash_card = flash_cards(:one)
  end

  test "visiting the index" do
    visit flash_cards_url
    assert_selector "h1", text: "Flash Cards"
  end

  test "creating a Flash card" do
    visit flash_cards_url
    click_on "New Flash Card"

    fill_in "Answer", with: @flash_card.answer
    fill_in "Level", with: @flash_card.level
    fill_in "Last practised at", with: @flash_card.last_practised_at
    fill_in "Question", with: @flash_card.question
    fill_in "User", with: @flash_card.user
    click_on "Create Flash card"

    assert_text "Flash card was successfully created"
    click_on "Back"
  end

  test "updating a Flash card" do
    visit flash_cards_url
    click_on "Edit", match: :first

    fill_in "Answer", with: @flash_card.answer
    fill_in "Level", with: @flash_card.level
    fill_in "Last practised at", with: @flash_card.last_practised_at
    fill_in "Question", with: @flash_card.question
    fill_in "User", with: @flash_card.user
    click_on "Update Flash card"

    assert_text "Flash card was successfully updated"
    click_on "Back"
  end

  test "destroying a Flash card" do
    visit flash_cards_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Flash card was successfully destroyed"
  end
end
