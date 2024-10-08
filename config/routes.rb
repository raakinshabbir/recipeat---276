Rails.application.routes.draw do
  devise_for :users
  get "/addrecipe", to: "addrecipe#index"


  root to: "home#index"
  # Defines the root path route ("/")
  # root "posts#index"
end
