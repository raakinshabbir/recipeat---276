Rails.application.routes.draw do
  get "/recipes", to: "recipes#index"
  devise_for :users



  root to: "home#index"
  # Defines the root path route ("/")
  # root "posts#index"
end
