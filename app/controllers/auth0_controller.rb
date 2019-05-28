class Auth0Controller < ApplicationController
  def callback
    # This stores all the user information that came from Auth0
    # and the IdP
    session[:userinfo] = request.env['omniauth.auth']

    if session[:userinfo]
      user = User.find_by_auth0_uid(session[:userinfo]["uid"])
      if user
        user.authinfo = session[:userinfo].to_json
        user.save
      else
        user = User.create(authinfo: session[:userinfo].to_json,
          auth0_uid: session[:userinfo]["uid"],
          nickname: session[:userinfo]["info"]["nickname"])
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
    redirect_to root_path
  end
end