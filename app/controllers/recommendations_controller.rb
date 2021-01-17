class RecommendationsController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?
  before_action :user_can_modify_recommendations?

  actions :all, except: [:index, :show]

  def new
    @recommendation = Recommendation.new
    @recommendation.idea_set = IdeaSet.find(params[:idea_set_id])
  end

  def create
    @recommendation = current_user.recommendations.new(recommendation_params)
    create! { @recommendation.idea_set.items.first }
  end

  def update
    update! { @recommendation.idea_set.items.first }
  end

  def destroy
    destroy! { @recommendation.idea_set.items.first }
  end


  private

  def user_can_modify_recommendations?
    unless current_user.can_modify_recommendations?
      flash[:danger] = "You are not allowed to do this"
      redirect_to root_url
    end
  end

    def recommendation_params
      params.require(:recommendation).permit(:idea_set_id, :person_id, :url, :notes, :score)
    end

end
