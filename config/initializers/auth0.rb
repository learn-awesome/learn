Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :auth0,
    ENV['AUTH0_PUBKEY'],
    ENV['AUTH0_PRIVKEY'],
    ENV['AUTH0_DOMAIN'],
    callback_path: '/auth/auth0/callback',
    authorize_params: {
      scope: 'openid profile email'
    }
  )
end
