class CoursesController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?, only: [:new, :create, :edit, :update, :destroy]

  def create
    @course = Course.new(course_params)
    @course.user = current_user
    create!
  end

  def enroll
    @course = Course.find(params[:id])
    status, message = @course.enroll!(current_user)
    if status
      redirect_to @course, notice: "All the best!"
    else
      redirect_to @course, alert: message
    end
  end

  private

    def course_params
      params.require(:course).permit(:name, :description, :image_url, :topic_id, :cost)
    end

end
