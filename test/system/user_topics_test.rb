require "application_system_test_case"

class UserTopicsTest < ApplicationSystemTestCase
  setup do
    @user_topic = user_topics(:one)
  end

  test "visiting the index" do
    visit user_topics_url
    assert_selector "h1", text: "User Topics"
  end

  test "creating a User topic" do
    visit user_topics_url
    click_on "New User Topic"

    click_on "Create User topic"

    assert_text "User topic was successfully created"
    click_on "Back"
  end

  test "updating a User topic" do
    visit user_topics_url
    click_on "Edit", match: :first

    click_on "Update User topic"

    assert_text "User topic was successfully updated"
    click_on "Back"
  end

  test "destroying a User topic" do
    visit user_topics_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "User topic was successfully destroyed"
  end
end
