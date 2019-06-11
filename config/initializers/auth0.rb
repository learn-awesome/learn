Rails.application.config.middleware.use OmniAuth::Builder do
  provider(
    :auth0,
    Rails.application.credentials.auth0[:public],
    Rails.application.credentials.auth0[:private],
    Rails.application.credentials.auth0[:domain],
    callback_path: '/auth/oauth2/callback',
    authorize_params: {
      scope: 'openid profile'
    }
  )
end
