class CoursesController < InheritedResources::Base
  include Secured
  before_action :logged_in_using_omniauth?, only: [:new, :create, :edit, :update, :destroy, :enroll]

  def show
    @course = Course.from_param(params[:id])
    @current_user_level = @course.current_user_level(current_user)
    if current_user.nil?
      render 'landing_page'
    elsif @current_user_level || @course.taught_by?(current_user)
      # enrolled or teacher
      if @course.taught_by?(current_user)
        @teacher = true
        @shown_level_index = (params[:level] && params[:level].to_i ) || 1

        @next_level_index = @shown_level_index + 1
        @prev_level_index = @shown_level_index - 1
        
        @next_level_index = nil if @shown_level_index == @course.levels.size
        @prev_level_index = nil if @shown_level_index == 1

        @shown_level = @course.nth_level(@shown_level_index)
      else
        @student = true
        @shown_level_index = @current_user_level.level.get_idx
        @shown_level = @current_user_level.try(:level)
      end
      render 
    else
      # neither enrolled nor teacher
      render 'landing_page'
    end
  end

  def dashboard
    @course = Course.from_param(params[:id])
  end

  def create
    @course = Course.new(course_params)
    @course.user = current_user
    create!(notice: "Great! Now define some levels with learning materials and challenges.") { dashboard_course_path(@course) }
  end

  def update
    @course = Course.from_param(params[:id])
    @course.user = current_user
    update! { dashboard_course_path(@course) }
  end

  def destroy
    @course = Course.from_param(params[:id])
    if @course.user != current_user
      raise "You can't delete courses owned by others"
    else
      destroy! { courses_path }
    end
  end

  def enroll
    @course = Course.from_param(params[:id])
    invite_code = params[:course][:invite_code]
    status, message = @course.enroll!(current_user, invite_code)
    if status
      redirect_to @course, notice: "All the best!"
    else
      render 'landing_page', notice: message
    end
  end

  protected
  def resource
    @course ||= Course.from_param(params[:id])
  end

  private

    def course_params
      params.require(:course).permit(:name, :description, :image_url, :topic_id, :cost, :invite_msg)
    end

end
