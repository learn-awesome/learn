class UserTopicsController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?
  before_action :require_owner, only: [:show, :edit, :update, :destroy]

  protected
  	def require_owner
	    unless current_user && resource.is_owned_by?(current_user)
	      resond_to do |format|
	        format.html { render :text => "Not Allowed", :status => :forbidden }
	      end
	    end
  	end

  private
    def user_topic_params
      params.require(:user_topic).permit()
    end

end
