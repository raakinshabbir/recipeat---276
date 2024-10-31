Rails.application.routes.draw do
  get "welcome/index"
  get "/swipe", to: "swipe#index"
  get "/recipes/:id", to: "recipes#show"
  devise_for :users

  get "/addrecipe", to: "addrecipe#index"

  get 'recipes/:id', to: 'recipes#show', as: 'recipe'

  resources :liked_recipes, only: [:index]
  post '/liked', to: 'liked#index'
  post '/swipe_right/:id', to: 'liked#swipe_right', as: 'swipe_right'

  get '/liked', to: 'liked#index'

  root to: "welcome#index"
  # Defines the root path route ("/")
  # root "posts#index"
end
