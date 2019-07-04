class ApplicationController < ActionController::Base
	include ApplicationHelper
	before_action :set_raven_context

	private
	def set_raven_context
		if session[:userinfo]
			Raven.user_context(id: session[:userinfo]["uid"])
		end
		Raven.extra_context(params: params.to_unsafe_h, url: request.url)
	end
end
