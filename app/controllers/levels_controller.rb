class LevelsController < InheritedResources::Base
  belongs_to :course

  private

    def level_params
      params.require(:level).permit(:name, :description, :course_id, :seq, :item_type_id, :link, :answer_type, :answer_prompt)
    end

end
