Rails.application.routes.draw do
  devise_for :clients
  devise_for :staffs
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'application#index'

  namespace :staff do
    root 'landing#index'
    resources :clients, only: %i[index create destroy], shallow: true
    resources :staffs, only: %i[index create destroy], shallow: true
    resources :organisations, only: %i[index create destroy], shallow: true

    get '/*slug', to: 'landing#index'
  end

  namespace :client do
    root 'landing#index'
  end
end
