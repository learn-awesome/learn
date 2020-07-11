class GroupsController < InheritedResources::Base
    include Secured
    before_action :logged_in_using_omniauth?, only: [:new, :create, :edit, :update, :destroy, :add_member, :accept_invite]
    custom_actions :resource => [:add_member, :accept_invite]
  
    belongs_to :user
  
    def create
        @group = Group.new(group_params)
        @group.group_members.build(role: 'admin', status: 'confirmed', user: current_user)
      create! do |format|
        format.html { redirect_to user_groups_path(current_user) }
      end
    end
  
    def destroy
      if !resource.is_admin?(current_user)
            render :file => "public/422.html", status: :unauthorized
        else
            destroy!
        end
    end
  
    def update
        if !resource.is_admin?(current_user)
            render :file => "public/422.html", status: :unauthorized
        else
            update!
        end
    end
  
    def add_member
        if !resource.is_admin?(current_user)
          render :file => "public/422.html", status: :unauthorized
        elsif request.post?
          identifier = params[:identifier].presence
          if identifier
            status, msg = resource.add_member!(identifier, current_user)
            if status
              flash[:success] = msg
              redirect_to user_group_path(current_user, resource)
            else
              flash[:danger] = msg
              redirect_to add_member_user_group_path(current_user, resource)
            end
            
            return
          else
            flash[:danger] = "Need username or email address of the user you want to invite"
            redirect_to add_member_user_group_path(current_user, resource)
            return
          end
        end
        # GET request -> show form
    end

    def accept_invite
      status, msg = resource.accept_invite!(current_user, params[:invite_code].to_s)
      if status
        flash[:success] = msg
        redirect_to user_group_path(current_user, resource)
      else
        flash[:danger] = msg
        redirect_to user_group_path(resource.admins.first, resource)
      end
    end

    private
    def group_params
        params.require(:group).permit(:name, :description, :image_url, :website_url)
    end
  end