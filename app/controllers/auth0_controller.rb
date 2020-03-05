class Auth0Controller < ApplicationController
  def callback
    # This stores all the user information that came from Auth0
    # and the IdP
    session[:userinfo] = request.env['omniauth.auth']

    #Rails.logger.info session[:userinfo].inspect

    if session[:userinfo]
      user = User.find_by_auth0_uid(session[:userinfo]["uid"])
      if user
        user.authinfo = session[:userinfo].to_json
        # Don't override nickname if already set
        # user.nickname = session[:userinfo]["info"]["nickname"]
        user.image_url = session[:userinfo]["info"]["image"]
        user.save
      else
        user = User.new(authinfo: session[:userinfo].to_json,
          auth0_uid: session[:userinfo]["uid"],
          nickname: session[:userinfo]["info"]["nickname"],
          image_url: session[:userinfo]["info"]["image"],
          referrer: request.env['omniauth.params']['ref'],
          post_reviews_to_twitter: true)

        if user.save
          user.decks.create(name: 'default deck')
          UserMailer.with(user: user).welcome_email.deliver_later
          Rails.logger.info "User #{user.auth0_uid} created"
        else
          Rails.logger.error user.errors.inspect
        end
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
    redirect_to 'https://' + ENV['AUTH0_DOMAIN'] + '/v2/logout?client_id=' + ENV['AUTH0_PUBKEY'] + '&returnTo=' + logout_url
  end
end