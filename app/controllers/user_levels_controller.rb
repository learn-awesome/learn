class UserLevelsController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?

  belongs_to :course, finder: :from_param, param: :course_id do
    belongs_to :level, param: :level_id
  end

  def update
    user_level = UserLevel.find(params[:id])
    if params[:commit] == "Submit Work"
      user_level.answer = params[:user_level][:answer]
      msg = 'Your answer has been saved. Now wait for the mentors to evaluate it.'
      user_level.submit!
    elsif params[:commit] == "Accept" && user_level.course.taught_by?(current_user)
      user_level.feedback = params[:user_level][:feedback]
      msg = "#{user_level.user.nickname} has been moved to the next level."
      user_level.accept!
    elsif params[:commit] == "Reject" && user_level.course.taught_by?(current_user)
      user_level.feedback = params[:user_level][:feedback]
      msg = "#{user_level.user.nickname}'s submission hass been rejected. They will have to re-submit it."
      user_level.reject!
    elsif params[:commit] == "Save feedback" && user_level.course.taught_by?(current_user)
      user_level.feedback = params[:user_level][:feedback]
      msg = "Feedback for #{user_level.user.nickname} has been saved."
      user_level.save!
    end
    redirect_to course_level_path(user_level.course, user_level.level), notice: msg 
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
