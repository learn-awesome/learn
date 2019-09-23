Rails.application.routes.draw do
  root 'welcome#index'

  get 'dashboard' => 'dashboard#show'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :topics, only: [:index, :show, :new, :create] do
    member do
      post 'toggle_follow'
      get  'merge'
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
    end

    member do
      get 'combine'
      post 'combine'
    end
  end

  resources :item_types, only: [:index, :show]

  resources :users, only: [:index, :show, :edit, :update] do
    member do
      get 'reviews'
      post 'toggle_follow'
      get 'settings'
      patch 'settings'
    end
  end

  resources :reviews, only: [:new, :create, :edit, :update, :show]

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
end
