module Secured
  extend ActiveSupport::Concern

  def logged_in_using_omniauth?
    if session[:userinfo].present? and session[:userinfo].is_a?(String) and SocialLogin.find_by_auth0_uid(session[:userinfo]).try(:user)
		# user logged in. if cookie has original_path then clear it and redirect there
		if session[:original_path].present?
			path = session[:original_path]
			session[:original_path] = nil
			redirect_to path
		end
	else
		session[:userinfo] = nil
		# store in cookie where user wanted to go
		session[:original_path] = request.fullpath
		redirect_to '/auth/auth0'
	end
  end
end