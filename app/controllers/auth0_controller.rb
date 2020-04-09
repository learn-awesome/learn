class Auth0Controller < ApplicationController
  def callback
    present_user = current_user # pre-fetch in case it changes below
    uid = request.env['omniauth.auth']["uid"]

    if uid # login successful
      sociallogin = SocialLogin.find_by_auth0_uid(uid)
      if sociallogin
        # found an account with this social login
        sociallogin.auth0_info = request.env['omniauth.auth'].to_json

        if present_user and (sociallogin.user_id != present_user.id)
          # It's not mapped to the currently logged_in user. Move and merge accounts
          old_user_id = sociallogin.user_id
          sociallogin.user = present_user
          # move reviews, items, points and #followers
          # Take care not to violate unique constraints while merging things
          Review.where(user_id: old_user_id).update_all(user_id: present_user.id) rescue nil
          Item.where(user_id: old_user_id).update_all(user_id: present_user.id) rescue nil
          UserUserRelation.where(from_user_id: old_user_id).update_all(from_user_id: present_user.id) rescue nil
          UserUserRelation.where(to_user_id: old_user_id).update_all(to_user_id: present_user.id) rescue nil
          Collection.where(user_id: old_user_id).update_all(user_id: present_user) rescue nil
          Deck.where(user_id: old_user_id).update_all(user_id: present_user) rescue nil
          FlashCard.where(user_id: old_user_id).update_all(user_id: present_user) rescue nil
        end

        sociallogin.user.image_url = request.env['omniauth.auth']["info"]["image"]
        sociallogin.save! && sociallogin.user.save!
      else
        if present_user
          user = present_user
          user.image_url = request.env['omniauth.auth']["info"]["image"]
        else
          user = User.new(
            nickname: request.env['omniauth.auth']["info"]["nickname"],
            image_url: request.env['omniauth.auth']["info"]["image"],
            referrer: request.env['omniauth.params']['ref'])
        end

        user.social_logins.build(
          auth0_info: request.env['omniauth.auth'].to_json,
          auth0_uid: request.env['omniauth.auth']["uid"])

        if present_user
          if user.save
            Rails.logger.info "SocialLogin #{uid} created for #{present_user.id}"
          else
            Rails.logger.error user.errors.inspect
          end
        else
          if user.save
            UserMailer.with(user: user).welcome_email.deliver_later
            Rails.logger.info "User #{uid} created"
          else
            Rails.logger.error user.errors.inspect
          end
        end
      end
    end

    # Redirect to the URL you want after successful auth
    session[:userinfo] = uid
    redirect_to '/dashboard'
  end

  def failure
    # show a failure page or redirect to an error page
    @error_msg = request.params['message']
  end

  def logout
    reset_session
    logout_url = root_url(only_path: false)
    redirect_to 'https://' + ENV['AUTH0_DOMAIN'] + '/v2/logout?client_id=' + ENV['AUTH0_PUBKEY'] + '&returnTo=' + logout_url
  end
end