Rails.application.routes.draw do
  devise_for :clients
  devise_for :staffs
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'application#index'

  namespace :api do
    namespace :staff do
      resources :clients do
        member do
          patch :reset_password
        end
      end
      resources :staffs do
        member do
          patch :reset_password
        end
      end
      resources :organisations, only: %i[index create destroy], shallow: true do
        resources :equipments, only: %i[create], shallow: true do
          collection do
            post :validate
          end
        end
      end
      resources :interactions, only: %i[create], shallow: true
    end
  end

  namespace :staff do
    root 'landing#index'
    get '/*slug', to: 'landing#index'
  end

  namespace :client do
    root 'landing#index'
    get '/*slug', to: 'landing#index'
  end

end
