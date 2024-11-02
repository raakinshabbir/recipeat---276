Rails.application.routes.draw do
  get 'filter_recipes', to: 'filter_recipes#index', as: 'filter_recipes'

  get 'welcome/index'
  get '/swipe', to: 'swipe#index'
  get 'recipes/share', to: 'recipes#share'
  get '/recipes/:id', to: 'recipes#show'
  devise_for :users

  resources :recipes do
    resource :liked, only: [:create, :destroy]
  end

  get '/addrecipe', to: 'addrecipe#new'
  post '/addrecipe', to: 'addrecipe#create', as: 'create_recipe' # Form submission
  get '/liked', to: 'liked#index', defaults: { format: :html }

  # New route for Recipe of the Day
  get '/recipe_of_the_day', to: 'recipes#recipe_of_the_day', as: 'recipe_of_the_day'

  #New route to trigger api calls when load more recipes is called
  get 'load_more_recipes', to: 'recipes#load_more'


  root to: 'welcome#index'
  # Defines the root path route ("/")
  # root "posts#index"
end
