class RecommendationsController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?
  actions :all, only: [:new, :create]

  def new
    @recommendation = Recommendation.new
    @recommendation.idea_set = IdeaSet.find(params[:idea_set_id])
  end

  def create
    @recommendation = current_user.recommendations.new(recommendation_params)

    if @recommendation.save
      redirect_to @recommendation.idea_set, notice: "Recommendation added successfully."
    else
      render :new
    end
  end


  private

    def recommendation_params
      params.require(:recommendation).permit(:idea_set_id, :person_id, :url, :notes, :score)
    end

end
