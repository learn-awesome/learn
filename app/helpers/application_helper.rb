module ApplicationHelper
  def user_signed_in?
    session[:userinfo].present?
  end

  def current_user
  	@current_user ||= User.find_by_auth0_uid(session[:userinfo]["uid"]) if user_signed_in?
  end
end
