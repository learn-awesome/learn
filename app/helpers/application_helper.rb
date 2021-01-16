module ApplicationHelper
  def user_signed_in?
    session[:userinfo].present? and session[:userinfo].is_a?(String)
  end

  def current_user
    # @current_user ||= SocialLogin.find_by_auth0_uid(session[:userinfo]).try(:user) if user_signed_in?
    @current_user ||= User.joins(:social_logins).where("social_logins.auth0_uid = ?",session[:userinfo]).first
  end

  def browser_extension(request)
    if request.user_agent.to_s.downcase.include?("firefox")
        "https://addons.mozilla.org/en-US/firefox/addon/learnawesome/"
    else
        "https://chrome.google.com/webstore/detail/learnawesome/mfmicnedcecjcchodnaijomibiplacie"
    end
  end

  def shorter_time_ago(ts)
    time_ago_in_words(ts).gsub(/ mi.*/, 'm')
      .gsub(/ h.*/, 'h')
      .gsub(/ d.*/, 'd')
      .gsub(/ mo.*/, 'mo')
      .gsub(/ y.*/, 'y')
      .gsub(/about /,'')
  end
end
