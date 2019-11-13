require "application_system_test_case"

class TopicsTest < ApplicationSystemTestCase
  test "visiting the index" do
    visit topics_url
    # assert_selector "h1", text: "User Topics"
  end

  test "creating a topic" do
    # visit new_topic_url

    # TODO: topic creation requires auth
    # fill_in "Name", "testing"
    # click_on "Create topic"

    # assert_text "Topic was successfully created"
    # click_on "Back"
  end
end
