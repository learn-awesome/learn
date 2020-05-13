class ApplicationController < ActionController::Base
	include ApplicationHelper
	before_action :set_raven_context
	before_action :allow_rack_mini_profiler
	before_action :set_variant 

	layout proc { |controller| controller.request.variant.first.to_s }

	private
	def set_raven_context
		if session[:userinfo]
			Raven.user_context(id: session[:userinfo])
		end
		Raven.extra_context(params: params.to_unsafe_h, url: request.url)
	end

	def allow_rack_mini_profiler
	    if current_user && current_user.is_core_dev? && params[:rmp].to_s == 'true'
	      Rack::MiniProfiler.authorize_request
	    end
	end
	
	def set_variant
		var = (:tailwind if params[:tailwind].to_s == 'true') ||
			(:bootstrap if params[:bootstrap].to_s == 'true') ||
			current_user.try(:theme_variant) ||
			(Rails.env.development? ? :tailwind : :bootstrap)
		Rails.logger.info("Using variant = #{var}")
		request.variant = var
	end
end
