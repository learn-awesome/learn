require 'json'

class TwitterBotJob < ApplicationJob
  queue_as :default

  def perform(event_string)
    # Listen for mentions, look up the link in the parent tweet and add topic/item as needed.
    event = JSON.parse(event_string)

=begin
{
  "for_user_id": "1114259648326987776",
  "user_has_blocked": false,
  "tweet_create_events": [
    {
      "created_at": "Sat Nov 28 05:30:03 +0000 2020",
      "id": 1332557345071644672,
      "id_str": "1332557345071644672",
      "text": "@Learn_Awesome Save this",
      "source": "\u003ca href=\"https:\/\/mobile.twitter.com\" rel=\"nofollow\"\u003eTwitter Web App\u003c\/a\u003e",
      "truncated": false,
      "in_reply_to_status_id": 1332252354599555074,
      "in_reply_to_status_id_str": "1332252354599555074",
      "in_reply_to_user_id": 1247048165561270272,
      "in_reply_to_user_id_str": "1247048165561270272",
      "in_reply_to_screen_name": "TanuLearns",
      "user": {
        "id": 1247048165561270272,
        "id_str": "1247048165561270272",
        "name": "Tanu Learns",
        "screen_name": "TanuLearns",
        "location": null,
        "url": null,
        "description": "Just a little girl having fun while learning.",
        "translator_type": "none",
        "protected": false,
        "verified": false,
        "followers_count": 20,
        "friends_count": 26,
        "listed_count": 0,
        "favourites_count": 1,
        "statuses_count": 17,
        "created_at": "Mon Apr 06 06:27:14 +0000 2020",
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": false,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "profile_background_color": "F5F8FA",
        "profile_background_image_url": "",
        "profile_background_image_url_https": "",
        "profile_background_tile": false,
        "profile_link_color": "1DA1F2",
        "profile_sidebar_border_color": "C0DEED",
        "profile_sidebar_fill_color": "DDEEF6",
        "profile_text_color": "333333",
        "profile_use_background_image": true,
        "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/1247102105732526080\/hAad9SZ9_normal.jpg",
        "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/1247102105732526080\/hAad9SZ9_normal.jpg",
        "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/1247048165561270272\/1586170836",
        "default_profile": true,
        "default_profile_image": false,
        "following": null,
        "follow_request_sent": null,
        "notifications": null
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "quote_count": 0,
      "reply_count": 0,
      "retweet_count": 0,
      "favorite_count": 0,
      "entities": {
        "hashtags": [
          
        ],
        "urls": [
          
        ],
        "user_mentions": [
          {
            "screen_name": "Learn_Awesome",
            "name": "Learn Awesome",
            "id": 1114259648326987776,
            "id_str": "1114259648326987776",
            "indices": [
              0,
              14
            ]
          }
        ],
        "symbols": [
          
        ]
      },
      "favorited": false,
      "retweeted": false,
      "filter_level": "low",
      "lang": "en",
      "timestamp_ms": "1606541403440"
    }
  ]
}
=end

    return unless event["for_user_id"] == "1114259648326987776" # must be for the LearnAwesomeBot
    return unless event["tweet_create_events"] # must be a new tweet created event
    return unless event["user_has_blocked"] # must not be mentioned by a blocked user
    tweet = event["tweet_create_events"].first
    
    user = tweet["user"]
    return if user["id_str"] == "1114259648326987776" # must not be self
    la_user = SocialLogin.where("auth0_uid LIKE 'twitter%'").where("auth0_info LIKE '%nickname\\\":\"#{user['screen_name']}\"%'").first.try(:user)
    # TODO return unless user is admin/whitelisted-user
    return unless la_user and la_user.is_admin?

    url = tweet["entities"]["urls"].first

    unless url
      # TODO: Find a URL in the tweet this is a reply to
      parent_tweet_id = tweet["in_reply_to_status_id_str"]
    end
    return unless url

    # TODO extract topic name from the tweet text
    topic = tweet["text"].parse_for_topic
    return if topic.blank?

    # TODO create topic if doesn't exist
    # TODO create item if url doesn't exist in Link.url
    # TODO add topic to the found or created item

    # TODO post a reply to the user whether topic/item were created or found with the link

    Rails.logger.info "In TwitterBotJob"
    Rails.logger.info event_string    
  end
end
