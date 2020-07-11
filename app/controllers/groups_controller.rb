class GroupsController < InheritedResources::Base
    include Secured
    before_action :logged_in_using_omniauth?, only: [:new, :create, :edit, :update, :destroy, :add_member]
    custom_actions :resource => [:add_member]
  
    belongs_to :user
  
    def create
        @group = Group.new(group_params)
        @group.group_members.build(role: 'admin', status: 'confirmed', user: current_user)
      create! do |format|
        format.html { redirect_to user_groups_path(current_user) }
      end
    end
  
    def destroy
        if resource.user != current_user
            render :file => "public/422.html", status: :nauthorized
        else
            destroy!
        end
    end
  
    def update
        membership = resource.group_members.find { |x| x.user == current_user }
        if !membership or !membership.is_admin?
            render :file => "public/422.html", status: :nauthorized
        else
            update!
        end
    end
  
    def add_member
        membership = resource.group_members.find { |x| x.user == current_user }
        if !membership or !membership.is_admin?
          render :file => "public/422.html", status: :nauthorized
        elsif request.post?
          identifier = params[:identifier].presence
          if identifier
            msg = resource.add_member!(identifier)
            flash[:success] = msg
            redirect_to user_group_path(current_user, resource)
            return
          else
            flash[:danger] = "Need email address of the user you want to invite"
            redirect_to user_group_add_member_path(current_user, resource)
            return
          end
        end
        # GET request -> show form
    end

    private
    def group_params
        params.require(:group).permit(:name, :description, :image_url, :website_url)
    end
  end