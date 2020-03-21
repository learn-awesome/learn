module ApplicationHelper
  def user_signed_in?
    session[:userinfo].present?
  end

  def current_user
  	@current_user ||= User.find_by_auth0_uid(session[:userinfo]["uid"]) if user_signed_in?
  end

  def browser_extension(request)
    if request.user_agent.to_s.downcase.include?("firefox")
        "https://addons.mozilla.org/en-US/firefox/addon/learnawesome/"
    else
        "https://chrome.google.com/webstore/detail/learnawesome/mfmicnedcecjcchodnaijomibiplacie"
    end
  end
end
