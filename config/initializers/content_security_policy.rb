# Be sure to restart your server when you modify this file.

# Define an application-wide content security policy
# For further information see the following documentation
# https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy

Rails.application.config.content_security_policy do |policy|
#  policy.default_src :self, :data, "https://bizzy.polyglot.network",
    # "https://cdn.jsdelivr.net", "https://rsms.me", "https://images.unsplash.com",
    # "https://typeahead.js.org", "https://lh3.googleusercontent.com", "https://pbs.twimg.com",
    # "https://learn-awesome.github.io"
#   policy.font_src    :self, :https, :data
#   policy.img_src     :self, :https, :data
#   policy.object_src  :none
#   policy.script_src  :self, :https, "https://cdn.jsdelivr.net"
#   policy.style_src   :self, :https
  policy.frame_ancestors :self, "https://bizzy.polyglot.network", "http://localhost:3000"
  # If you are using webpack-dev-server then specify webpack-dev-server host
  # policy.connect_src :self, :https, "http://localhost:3035", "ws://localhost:3035" if Rails.env.development?

  # Specify URI for violation reports
  # policy.report_uri "/csp-violation-report-endpoint"
end

# If you are using UJS then enable automatic nonce generation
# Rails.application.config.content_security_policy_nonce_generator = -> request { SecureRandom.base64(16) }

# Set the nonce only to specific directives
# Rails.application.config.content_security_policy_nonce_directives = %w(script-src)

# Report CSP violations to a specified URI
# For further information see the following documentation:
# https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only
Rails.application.config.content_security_policy_report_only = true
