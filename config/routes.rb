require 'sidekiq/web'

Rails.application.routes.draw do

  resources :recommendations
  authenticate :admin_user do
    mount Sidekiq::Web => '/sidekiq'
  end

  resources :decks do
    get 'practice', on: :member
  end
  
  resources :flash_cards do
    get 'practice', on: :collection

    member do
      post 'did_recall'
      post 'did_not_recall'
    end

    collection do
      get 'notes'
      post 'notes'
    end
  end

  root 'welcome#index'

  get 'dashboard' => 'dashboard#show'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :topics, except: [:destroy] do
    member do
      post 'toggle_follow'
      get  'merge'
      post 'merge'
      get 'explore'
      post 'wiki_update'
      get 'practice'
      post 'practice'
      get 'actor'
      post 'inbox'
      get 'outbox'

      get 'ap_followers'
      get 'ap_following'
    end
    collection do
      get 'search'
      get 'discover'
    end
  end
  
  resources :people do
    member do
      get 'wikidata'
    end

    collection do
      get 'discover'
    end
  end

  resources  :items do
    collection do
      get 'search'
      get 'query'
      get 'discover'
      get 'new_syllabus'
      get 'syllabus_editor'
    end

    member do
      get 'combine'
      post 'combine'
      post 'add_related_items'
    end
  end

  resources :idea_sets, only: [:show, :new, :create, :edit, :update]

  resources :recommendations, except: [:index, :show]

  resources :item_types, only: [:index, :show] do
    collection do
      get 'discover'
    end

    member do
      get 'discover'
    end
  end

  resources :users, only: [:index, :show, :edit, :update] do
    member do
      get 'reviews'
      post 'toggle_follow'
      get 'settings'
      patch 'settings'
      get 'actor'
      post 'inbox'
      get 'outbox'
      post 'toggle_reviewposting'
      get 'onboarding'
      get 'garden'
      post 'garden'
      get 'upgrade_role'
      get 'downgrade_role'

      get 'ap_followers'
      get 'ap_following'
    end

    collection do
      get 'webfinger'
      get 'discover'
    end

    resources :collections do
      member do
        post 'toggle_item'
        get 'import_goodreads_list'
        post 'import_goodreads_list'
      end
    end

    resources :groups do
      member do
        get 'add_member'
        post 'add_member'
        get 'accept_invite' # Need GET for redirecting logged out users accepting invites from email
        post 'accept_invite' # for links in the app
      end
    end
  end

  resources :reviews, only: [:new, :create, :edit, :update, :show] do
    member do
      get 'tweet' # only for testing and preview
      post 'add_reaction'
    end
  end

  # resources :user_topics

  get 'auth/oauth2/callback' => 'auth0#callback'
  get 'auth/auth0/callback' => 'auth0#callback'
  get 'auth/failure' => 'auth0#failure'
  get 'auth/logout' => 'auth0#logout'
  get '/forcelogin' => 'dashboard#forcelogin'
  get '/logout' => 'auth0#logout'
  get '/formats' => 'item_types#index'
  get '/about' => 'welcome#about'
  get '/search' => 'welcome#search'
  get '/isbnsearch' => 'welcome#isbnsearch'
  get '/suggestions' => 'welcome#suggestions'
  get '/whatsnew' => 'welcome#whatsnew'
  get '/kids' => 'welcome#kids'
  get '/components' => 'welcome#components'
  get '/.well-known/webfinger' => 'users#webfinger'
  get '/browser_addon' => 'welcome#browser_addon'
  get '/join_slack' => 'welcome#join_slack'
  get '/programs' => 'welcome#programs'
  get '/digitalgardensetup' => 'welcome#digitalgardensetup'
  get '/digitalgarden' => 'users#garden'
  get '/sitemap.xml' => 'welcome#sitemap'
  get '/collection_discover' => 'welcome#collection_discover'
  post '/csp-violation-report-endpoint' => 'welcome#csp_report'
  get '/webhooks/twitter' => 'welcome#twitterhookcrccheck'
  post '/webhooks/twitter' => 'welcome#twitterhook'
  get '/slack_authorize' => 'welcome#slack_authorize'
  post '/slack_command' => 'welcome#slack_command'
  get '/dataset' => 'welcome#dataset'
end
