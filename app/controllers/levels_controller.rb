class LevelsController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?, only: [:new, :create, :edit, :update, :destroy]

  belongs_to :course, finder: :from_param

  def show
    level = resource
    level_idx = level.get_idx
    redirect_to course_path(resource.course, level: level_idx)
  end

  def create
    create! { dashboard_course_path(@course) }
  end

  def update
    update! { dashboard_course_path(@course) }
  end

  def destroy
    destroy! { dashboard_course_path(@course) }
  end

  private

    def level_params
      params.require(:level).permit(:name, :description, :seq, :item_type_id, :link, :answer_type, :answer_prompt)
    end

end
