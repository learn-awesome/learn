class UserLevelsController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?

  belongs_to :course, finder: :from_param, param: :course_id do
    belongs_to :level, param: :level_id
  end

  def update
    user_level = UserLevel.find(params[:user_level_id])
    if params[:commit] == "Submit Work"
      user_level.answer = params[:answer]
      user_level.submit!
    elsif params[:commit] == "Accept" && user_level.course.taught_by?(current_user)
      user_level.feedback = params[:feedback]
      user_level.accept!
    elsif params[:commit] == "Reject" && user_level.course.taught_by?(current_user)
      user_level.feedback = params[:feedback]
      user_level.reject!
    end
    redirect_to course_level_path(@user_level.course, @user_level.level) 
  end

  def destroy
    user_level = UserLevel.find(params[:id])
    user_level.destroy!
    redirect_to course_level_path(user_level.course, user_level.level)
  end

  private

    def user_level_params
      params.require(:user_level).permit(:answer, :status, :feedback, :metadata)
    end

end
