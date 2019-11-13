require 'test_helper'

class TopicsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get new_topic_url
    assert_redirected_to '/auth/auth0'
  end
end
