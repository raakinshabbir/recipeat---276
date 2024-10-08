Rails.application.routes.draw do
  devise_for :users
  get "/addRecipe", to: "addRecipe#index"


  root to: "home#index"
  # Defines the root path route ("/")
  # root "posts#index"
end
