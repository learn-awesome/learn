require 'httparty'
require 'twitter'
require 'uri'

class Auth0Client
	def self.get_access_token
        if ENV.has_key?("AUTH0_DOMAIN") && ENV.has_key?("AUTH0_PUBKEY") && ENV.has_key?("AUTH0_PRIVKEY")
          auth0_resp = HTTParty.post("https://" + ENV["AUTH0_DOMAIN"] + "/oauth/token",
            body: {
              client_id: ENV["AUTH0_PUBKEY"],
              client_secret: ENV["AUTH0_PRIVKEY"],
              audience: ("https://" + ENV["AUTH0_DOMAIN"] + "/api/v2/"),
              grant_type: "client_credentials"
            }.to_json,
            headers: { 'Content-Type' => 'application/json' },
            # debug_output: $stdout
          )
          return JSON.parse(auth0_resp.body)["access_token"]
        end
	end

	def self.get_user_profile(access_token, social_login)
		user_id = URI::encode(social_login.auth0["uid"])
		auth0_resp = HTTParty.get("https://" + ENV["AUTH0_DOMAIN"] + "/api/v2/users/#{user_id}", headers: {'Authorization': "bearer #{access_token}"})
		# {"name"=>"Nilesh Trivedi", "picture"=>"https://pbs.twimg.com/profile_images/1116207438011650049/67G1IbhE_normal.png", "description"=>"I like to make things. But I also like to make things up. Always learning.", "location"=>"India", "screen_name"=>"nileshtrivedi", "url"=>"https://t.co/4otMnE6wqb", "updated_at"=>"2019-07-30T14:48:02.011Z", "user_id"=>"twitter|14613296", "nickname"=>"Nilesh Trivedi", "identities"=>[{"access_token"=>"14613296-yJyxrAm3WP9MyMH3xYBXOFsPl5Nymeht4k3w2OvAT", "access_token_secret"=>"iEorpOQv2YWuvgH1tmfQOJmmUlEEiBZjCQapZixXmZ0H", "provider"=>"twitter", "user_id"=>"14613296", "connection"=>"twitter", "isSocial"=>true}], "created_at"=>"2019-07-16T17:55:56.834Z", "last_ip"=>"49.207.55.70", "last_login"=>"2019-07-30T14:48:02.011Z", "logins_count"=>15}
		return JSON.parse(auth0_resp.body)
	end

	def self.get_first_identity(auth0_user_profile)
		# [{"access_token"=>"14613296-yJyxrAm3WP9MyMH3xYBXOFsPl5Nymeh4k3w2OvAB", "access_token_secret"=>"gEorpOQv2YWuvgH1tmfQOJmNmUlEEiZjCQapZixXmZ0H", "provider"=>"twitter", "user_id"=>"14613296", "connection"=>"twitter", "isSocial"=>true}]
		auth0_user_profile["identities"].first
	end

	def self.get_tweet(tweet_id)
		client = Twitter::REST::Client.new do |config|
			config.consumer_key        = ENV["TWBOT_CONSUMER_KEY"]
			config.consumer_secret     = ENV["TWBOT_CONSUMER_SECRET"]
			config.bearer_token        = ENV["TWBOT_BEARER_TOKEN"]
		end

		client.status(tweet_id, tweet_mode: 'extended')
	end

	def self.post_tweet(social_login, message, in_reply_to = nil)
		auth0_access_token = self.get_access_token
		auth0_user_profile = self.get_user_profile(auth0_access_token, social_login) if auth0_access_token
		return false if auth0_user_profile.nil?
		auth0_first_identity = self.get_first_identity(auth0_user_profile)
		return false if auth0_first_identity.nil?

		client = Twitter::REST::Client.new do |config|
		  config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
		  config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"]
		  config.access_token        = auth0_first_identity["access_token"]
		  config.access_token_secret = auth0_first_identity["access_token_secret"]
		end
		if in_reply_to
			client.update("@" + in_reply_to["user"].try(:[],"screen_name").to_s + " " + message.to_s, in_reply_to_status: in_reply_to)
		else
			client.update(message.to_s)
		end
		return true
	end

	def self.post_linkedin_share(social_login, payload)
		auth0_access_token = self.get_access_token
		auth0_user_profile = self.get_user_profile(auth0_access_token, social_login) if auth0_access_token
		return false if auth0_user_profile.nil?
		auth0_first_identity = self.get_first_identity(auth0_user_profile)
		return false if auth0_first_identity.nil?

		linkedin_access_token = auth0_first_identity["access_token"]

		HTTParty.post("https://api.linkedin.com/v2/ugcPosts",
			headers: {'X-Restli-Protocol-Version': '2.0.0', 'Authorization': "Bearer #{linkedin_access_token}"},
			body: payload.merge({"author": "urn:li:person:#{social_login.linkedin_person_urn}"}).to_json)
	end

	def self.post_goodreads(social_login, message)
		auth0_access_token = self.get_access_token
		auth0_user_profile = self.get_user_profile(auth0_access_token, social_login) if auth0_access_token
		return false if auth0_user_profile.nil?
		auth0_first_identity = self.get_first_identity(auth0_user_profile)
		return false if auth0_first_identity.nil?

		goodreads_access_token = auth0_first_identity["access_token"]

		# consumer = OAuth::Consumer.new(
		# 	ENV['GOODREADS_CLIENTID'],
		# 	ENV['GOODREADS_CLIENTSECRET'],
		# 	:site => 'https://www.goodreads.com')
		# token = JSON.parse(user.goodreads_token)["token"]
		# secret = JSON.parse(user.goodreads_token)["secret"]
		# access_token = OAuth::AccessToken.new(consumer, token, secret)
		# access_token.post('/user_status.xml', {
		# 	'user_status[body]' => review.goodreads_msg
		# })

		HTTParty.post("https://www.goodreads.com/user_status.xml",
			headers: {'Authorization': "Bearer #{goodreads_access_token}"},
			body: {'user_status[body]' => message}.to_json)
	end

	def self.fetch_email(social_login)
		auth0_access_token = Auth0Client.get_access_token
		auth0_user_profile = Auth0Client.get_user_profile(auth0_access_token, social_login) if auth0_access_token
		return if auth0_user_profile.nil?
		return auth0_user_profile["email"]
	end
end