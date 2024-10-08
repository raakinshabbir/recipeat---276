Rails.application.routes.draw do
  get "welcome/index"
  get "/swipe", to: "swipe#index"
  get "/recipes/:id", to: "recipes#show"
  devise_for :users



  root to: "welcome#index"
  # Defines the root path route ("/")
  # root "posts#index"
end
