Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/dashboard', to: 'users#dashboard'

  resources :poems, only: [:index, :show] do
    resources :lessons, only: [:create]
  end

  resources :lessons, only: [:show] do
    resources :recites, only: [:create]
    member do
      get 'reading'
      patch 'reading', to: 'lessons#update_reading'

      get 'listening'
      patch 'listening', to: 'lessons#update_listening'
    end
  end

  resources :recites, only: [:show, :update]
end
