require "application_system_test_case"

class TopicsTest < ApplicationSystemTestCase
  test "visiting the topic index" do
    visit topics_url
    # assert_selector "div", text: "You can also see the"
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
