class Auth0Controller < ApplicationController
  def callback
    # This stores all the user information that came from Auth0
    # and the IdP
    session[:userinfo] = request.env['omniauth.auth']

    if session[:userinfo]
      user = User.find_by_auth0_uid(session[:userinfo]["uid"])
      if user
        user.authinfo = session[:userinfo].to_json
        # Don't override nickname if already set
        # user.nickname = session[:userinfo]["info"]["nickname"]
        user.image_url = session[:userinfo]["info"]["image"]
        user.save
      else
        user = User.create(authinfo: session[:userinfo].to_json,
          auth0_uid: session[:userinfo]["uid"],
          nickname: session[:userinfo]["info"]["nickname"],
          image_url: session[:userinfo]["info"]["image"])
      end
    end

    # Redirect to the URL you want after successful auth
    redirect_to '/dashboard'
  end

  def failure
    # show a failure page or redirect to an error page
    @error_msg = request.params['message']
  end

  def logout
    reset_session
    logout_url = root_url(only_path: false)
    redirect_to 'https://learnawesome.eu.auth0.com/v2/logout?client_id=' + Rails.application.credentials.auth0[:public] + '&returnTo=' + logout_url
  end
end