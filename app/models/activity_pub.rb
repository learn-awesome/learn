require 'json'
require 'http'

# See https://github.com/tootsuite/mastodon/blob/a8b0bb355d3e7351b9f3d53fe7a3fb6d3d011d33/app/controllers/concerns/signature_verification.rb

class ActivityPub
	def self.sign(keyId, inbox, host, date, privkey)
		# from https://blog.joinmastodon.org/2018/06/how-to-implement-a-basic-activitypub-server/
	    keypair       = OpenSSL::PKey::RSA.new(privkey)
	    string_for_signing = "(request-target): post #{inbox}\nhost: #{host}\ndate: #{date}"
	    # puts "string_for_signing = #{string_for_signing}"

	    signature     = Base64.strict_encode64(keypair.sign(OpenSSL::Digest::SHA256.new, string_for_signing))
	    header        = 'keyId="' + keyId + '",headers="(request-target) host date",signature="' + signature + '"'
	    return header
	end

	def self.verify(pubkey, all_headers, inbox)
	  orig_sig_header = all_headers['HTTP_SIGNATURE']

	  signature_params = {}

	  orig_sig_header.split(',').each do |part|
	    parsed_parts = part.match(/([a-z]+)="([^"]+)"/i)
	    next if parsed_parts.nil? || parsed_parts.size != 3
	    signature_params[parsed_parts[1]] = parsed_parts[2]
	  end

	  key_id    = signature_params['keyId']
	  headers   = signature_params['headers']
	  signature = Base64.decode64(signature_params['signature'])

	  if pubkey
	  	key = OpenSSL::PKey::RSA.new(pubkey)
	  else
		actor = JSON.parse(HTTP.get(key_id, headers: {'Accept': 'application/json'}).to_s)
		key   = OpenSSL::PKey::RSA.new(actor['publicKey']['publicKeyPem'])
	  end

	  comparison_string = headers.split(' ').map do |signed_header_name|
	    if signed_header_name == '(request-target)'
	      "(request-target): post #{inbox}"
	    else
	      "#{signed_header_name}: #{all_headers[ActivityPub.to_header_name(signed_header_name)]}"
	    end
	  end.join("\n")

	  return key.verify(OpenSSL::Digest::SHA256.new, signature, comparison_string)
	end

	def self.to_header_name(name)
		return 'HTTP_DIGEST' if name == 'digest'
		return 'HTTP_HOST' if name == 'host'
		return 'HTTP_DATE' if name == 'date'
		name.to_s.upcase.gsub("-","_")
	end

	def self.test
		date = Time.now.utc.httpdate
		inbox, host = "/inbox", "mastodon.social"
		keyId = "foo"
		orig_sig_header = ActivityPub.sign(keyId, inbox, host, date, ENV['ACTIVITYPUB_PRIVKEY'].to_s)

		puts "\n Built orig_sig_header = #{orig_sig_header}"

		return ActivityPub.verify(
			ENV['ACTIVITYPUB_PUBKEY'].to_s,
			{"Host" => host, "Date"=> date, "Signature"=> orig_sig_header},
			inbox
		)
	end

	def self.test_prod
		user = User.first
		date = Time.now.utc.httpdate
		inbox, host = Rails.application.routes.url_helpers.inbox_user_url(user), "learnawesome.org"
		keyId = Rails.application.routes.url_helpers.actor_user_url(user)
		orig_sig_header = ActivityPub.sign(keyId, inbox, host, date, ENV['ACTIVITYPUB_PRIVKEY'].to_s)

		puts "\n Built orig_sig_header = #{orig_sig_header}"

		return ActivityPub.verify(
			ENV['ACTIVITYPUB_PUBKEY'].to_s,
			{"Host" => host, "Date"=> date, "Signature"=> orig_sig_header},
			inbox
		)
	end
end