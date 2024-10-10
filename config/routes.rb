Rails.application.routes.draw do
  get "welcome/index"
  get "/swipe", to: "swipe#index"
  get "/recipes/:id", to: "recipes#show"
  devise_for :users

  get "/addrecipe", to: "addrecipe#index"

  resources :liked_recipes, only: [:index, :create]
  get '/liked', to: 'liked#index'
  post '/liked', to: 'liked#create' 
  
    root to: "welcome#index"
  # Defines the root path route ("/")
  # root "posts#index"
end
