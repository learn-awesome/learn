module Secured
  extend ActiveSupport::Concern

  def logged_in_using_omniauth?
  	flash[:danger] = "This action requires loggin in."
    redirect_to '/' unless session[:userinfo].present?
  end
end