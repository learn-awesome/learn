class RocketchatController < ApplicationController
    def iframe
        if current_user
            # We are sending a script tag to the front-end with the RocketChat 
            # Auth Token that will be used to authenticate the user
            # https://mohammedlakkadshaw.com/blog/embedding-rocket-chat-using-iframe-auth.html/
            render layout: false
        else
            render plain: 'Not logged in', status: :unauthorized
        end
    end

    def api
        # This method will be called by Rocket.chat to fetch the login token
        if current_user && current_user.email.presence
            render json: {loginToken: current_user.create_or_login_rocketchat}
        else
            render json: {message: 'Not logged in or no email available'}, status: :unauthorized
        end
    end

end
