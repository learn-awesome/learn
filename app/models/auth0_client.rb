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

	def self.get_user_profile(access_token, user)
		user_id = URI::encode(user.auth0["uid"])
		auth0_resp = HTTParty.get("https://" + ENV["AUTH0_DOMAIN"] + "/api/v2/users/#{user_id}", headers: {'Authorization': "bearer #{access_token}"})
		identities = JSON.parse(auth0_resp.body)
		# [{"access_token"=>"14613296-yJyxrAm3WP9MyMH3xYBXOFsPl5Nymeht4k3w2OvAB", "access_token_secret"=>"gEorpOQv2YWuvgH1tmfQOJmNmUlEEiBZjCQapZixXmZ0H", "provider"=>"twitter", "user_id"=>"14613296", "connection"=>"twitter", "isSocial"=>true}]
		return identities.first
	end

	def self.post_tweet(user, message)
		auth0_access_token = self.get_access_token
		auth0_user_profile = self.get_user_profile(auth0_access_token, user) if auth0_access_token
		return false if auth0_user_profile.nil?

		client = Twitter::REST::Client.new do |config|
		  config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
		  config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"]
		  config.access_token        = identity["access_token"]
		  config.access_token_secret = identity["access_token"]
		end
		client.update(message)
		return true
	end
end