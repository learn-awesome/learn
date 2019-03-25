Rails.application.routes.draw do
  get 'welcome/index'
  root 'welcome#index'

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :topics, only: [:index, :show]
  resources :people, only: [:index, :show]
end
