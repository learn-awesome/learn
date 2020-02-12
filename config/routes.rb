Rails.application.routes.draw do
  resources :flash_cards
  root 'welcome#index'

  get 'dashboard' => 'dashboard#show'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :topics, only: [:index, :show, :new, :create] do
    member do
      post 'toggle_follow'
      get  'merge'
      post 'merge'
    end
    collection do
      get 'search'
      get 'discover'
    end
  end
  resources :people
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

  resources :idea_sets, only: [:new, :create, :edit, :update]
  
  resources :item_types, only: [:index, :show]

  resources :users, only: [:index, :show, :edit, :update] do
    member do
      get 'reviews'
      post 'toggle_follow'
      get 'settings'
      patch 'settings'
      get 'actor'
      post 'inbox'
      get 'outbox'
      get 'connectgoodreads'
      get 'disconnectgoodreads'
      get 'goodreads_oauth_callback'
    end

    collection do
      get 'webfinger'
    end

    resources :collections do
      member do
        post 'toggle_item'
      end
    end
  end

  resources :reviews, only: [:new, :create, :edit, :update, :show] do
    member do
      get 'tweet' # only for testing and preview
    end
  end

  # resources :user_topics

  get 'auth/oauth2/callback' => 'auth0#callback'
  get 'auth/auth0/callback' => 'auth0#callback'
  get 'auth/failure' => 'auth0#failure'
  get 'auth/logout' => 'auth0#logout'
  get '/logout' => 'auth0#logout'
  get '/formats' => 'item_types#index'
  get '/about' => 'welcome#about'
  get '/search' => 'welcome#search'
  get '/suggestions' => 'welcome#suggestions'
  get '/whatsnew' => 'welcome#whatsnew'
  get '/.well-known/webfinger' => 'users#webfinger'
end
