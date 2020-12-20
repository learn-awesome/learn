require 'json'
require 'uri'
require 'pathname'
require 'final_redirect_url'

class TwitterBotJob < ApplicationJob
  queue_as :default

  def perform(event_string)

    Rails.logger.info "In TwitterBotJob"
    Rails.logger.info event_string

    bot_sl = SocialLogin.where(auth0_uid: "twitter|1114259648326987776").first
    return unless bot_sl

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
        "protected": false,
        "verified": false,
        "followers_count": 20,
        "friends_count": 26,
        "listed_count": 0,
        "translator_type": "none",
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
    return if event["user_has_blocked"] # must not be mentioned by a blocked user
    tweet = event["tweet_create_events"].first

    return unless tweet["text"].to_s.downcase.include?("bot")
    tweet_text = tweet["text"].to_s.sub(/bot[,:]+\s+/i,"")

    user = tweet["user"]
    return unless user
    return if user["id_str"] == "1114259648326987776" # must not be posted by self
    la_user = SocialLogin.where("auth0_uid LIKE 'twitter%'").where("auth0_info::text LIKE '%nickname\\\\\":\\\\\"#{user['screen_name']}\\\\\"%'").first.try(:user)

    # user must be a known user
    unless la_user
      msg = "You must connect your Twitter account to your LearnAwesome.org account to use this bot."
      Auth0Client.post_tweet(bot_sl, msg, tweet)
      return
    end
    
    # user must be whitelisted for bot
    unless la_user.is_tester?
      msg = "This feature is currently only available to beta testers for LearnAwesome. Please join our Slack group to become one."
      Auth0Client.post_tweet(bot_sl, msg, tweet)
      return
    end

    url = tweet["entities"]["urls"].first

    unless url
      # Find a URL in the tweet this is a reply to
      parent_tweet_id = tweet["in_reply_to_status_id_str"]
      ptw = Auth0Client.get_tweet(parent_tweet_id)

      # We are using tweet_mode=extended
      url = JSON.parse(ptw.to_json)["entities"]["urls"].first.try(:[],"expanded_url")
    end
    
    Auth0Client.post_tweet(bot_sl, "No link found either in your tweet or the parent tweet", tweet) and return unless url

    item_or_topic_or_url = Link.lookup_entity_by_url(url)

    if item_or_topic_or_url.is_a?(Topic)
      # The url points to a LearnAwesome topic, we shouldn't treat this as a learning resource
      # TODO: see data[:status] and decide if user wants to follow or unfollow that topic
      return
    elsif item_or_topic_or_url.is_a?(Item)
      # Item found. No need to create topic or item. Adding review after this if block
      # Not returning here
    elsif item_or_topic_or_url.nil?
      # lookup_entity_by_url returned nil. Either something went wrong or it's a LA url
      return
    elsif la_user.is_tester? # we have an external URL and user is allowed to create new items
      unless data[:topic] && data[:item_type]
        Auth0Client.post_tweet(bot_sl, "Both topic and format are needed to add a new item.", tweet) and return
      end

      item_type = ItemType.where(id: data[:item_type].to_s).first
      Auth0Client.post_tweet(bot_sl, "We don't recognize that format or item type.", tweet) and return unless item_type

      # Create topic if needed
      topic = Topic.where(name: data[:topic].downcase).first || Topic.create(display_name: data[:topic], 'search_index': data[:topic], 'gitter_room': data[:topic])
      
      # Create idea_set+item+link
      Item.transaction do
        idea_set = IdeaSet.new(name: (extracted[:title].presence || url)[0..255])
        idea_set.save
        TopicIdeaSet.create(topic_id: topic.id, idea_set: idea_set)
        item = Item.new(
          item_type: item_type,
          name: idea_set.name,
          user: la_user,
          is_approved: la_user.is_tester?
        )
        item.links.build
        item.links.first.url = url
        item.save
      end
      
    else # User is not allowed to create new items
      Auth0Client.post_tweet(bot_sl, "You need to earn points to be able to add new items", tweet) and return
    end

    if data[:status] or data[:rating] or data[:review]
      # Add or update the review
      review = Review.find_or_initialize_by(user: la_user, item: item)
      review.status = data[:status] if data[:status]
      review.overall_score = data[:rating] if data[:rating]
      review.notes = review.notes.to_s + data[:review].to_s
      review.save
      message = "Nice! Your learning status and review is now updated at " + Rails.application.routes.url_helpers.item_url(item)
    else
      message = "You can find this item at " + Rails.application.routes.url_helpers.item_url(item)
    end

    Auth0Client.post_tweet(bot_sl, message, tweet) if message.present?
    return
  rescue => e
    Rails.logger.info "Something went wrong in TwitterBotJob#perform: #{e.message}"
  end

  def self.parse_tweet(text)
    # Extract status, rating, review, topic and format from the text and return
    # Example texts:
    # only status: i want to learn / i am currently learning / i have learned
    # only rating: rate 3 or rate 3/5

    status_map = {
      "i want to learn" => "want_to_learn",
      "want to learn" => "want_to_learn",
      "i wanna learn" => "want_to_learn",
      "wanna learn" => "want_to_learn",
      "i'd like to learn" => "want_to_learn",
      "i would like to learn" => "want_to_learn",

      "learning" => "learning",
      "am learning" => "learning",
      "i am learning" => "learning",
      "i'm learning" => "learning",
      "am currently learning" => "learning",
      "i am currently learning" => "learning",
      "i'm currently learning" => "learning",

      "have learned" => "learned",
      "i have learned" => "learned",
      "learned" => "learned",
      "i learned" => "learned",
      "already learned" => "learned",
      "i already learned" => "learned",
      "have already learned" => "learned",
      "i have already learned" => "learned"
    }

    topic = status = rating = review = nil

    status_match = text.match /(?<status>#{status_map.keys.join("|")})\s(this|it|that)?/i
    status = status_map[status_match[:status].downcase] if status_match

    rating_match = text.match /rate (?<rating>\d)\s?\/?\s?5?/i
    rating = rating_match[:rating].to_i if rating_match
    rating = 5 if rating > 5 if rating
    rating = nil if rating <= 0 if rating

    topic_match = text.match /in\s+(?<topic>[[:graph:]]+)/i
    topic = topic_match[:topic] if topic_match

    format_match = text.match /as (a )?(?<format>#{ItemType.all.map(&:id).join("|")})/i
    format = format_match[:format] if format_match

    review = text.sub(status_match.to_s, "")
      .sub(rating_match.to_s, "")
      .sub(topic_match.to_s, "")
      .sub(format_match.to_s, "")
      .strip.presence

    return {topic: topic, status: status, rating: rating, review: review, item_type: format}
  end
end
