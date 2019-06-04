Rails.application.routes.draw do
  get 'dashboard/show'
  get 'welcome/index'
  root 'welcome#index'
  get 'welcome/about'

  get 'dashboard' => 'dashboard#show'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :topics, only: [:index, :show] do
    member do
      post 'toggle_follow'
    end
  end
  resources :people, only: [:index, :show]
  resources  :items do
    collection do
      get 'search'
      get 'discover'
    end
  end

  resources :item_types, only: [:index, :show]
  resources :users, only: [:index, :show]

  get 'auth/oauth2/callback' => 'auth0#callback'
  get 'auth/failure' => 'auth0#failure'
  get '/logout' => 'auth0#logout'
  get '/formats' => 'item_types#index'
  get '/about' => 'welcome#about'
end
