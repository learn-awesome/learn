class UserLevelsController < InheritedResources::Base

  nested_belongs_to :course, :level

  private

    def user_level_params
      params.require(:user_level).permit(:user_id, :course_id, :level_id, :answer, :status, :feedback, :metadata)
    end

end
