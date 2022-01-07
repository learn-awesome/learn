class ApplicationController < ActionController::Base
	include ApplicationHelper
	before_action :set_sentry_context
	before_action :allow_rack_mini_profiler
	before_action :set_variant
	after_action :remove_x_frame_options

	layout proc { |controller| params['ext'].to_s == 'true' ? 'embed' :  'newlayout' }

	private
	def set_sentry_context
		Rails.logger.info "ORIGIN = #{request.headers['origin']}"
		return unless Rails.env.production?
		if session[:userinfo]
			Sentry.set_user(id: session[:userinfo])
		end
		Sentry.set_extras(params: params.to_unsafe_h, url: request.url)
	end

	def allow_rack_mini_profiler
	    if current_user && current_user.is_core_dev? && params[:rmp].to_s == 'true'
	      Rack::MiniProfiler.authorize_request
	    end
	end
	
	def set_variant
		var = (params[:theme].to_sym if params[:theme].present?) ||
			current_user.try(:theme_variant) || :tailwind
		Rails.logger.info("Using variant = #{var}")
		request.variant = var
	end

	def remove_x_frame_options
	  response.headers.except! 'X-Frame-Options'
	end
end
