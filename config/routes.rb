Rails.application.routes.draw do
  root             'static_pages#home'
  get 'timeline'=> 'microposts#timeline', type: :feed
  get 'poll'    => 'static_pages#poll'
  get 'help'    => 'static_pages#help'
  get 'about'   => 'static_pages#about'
  get 'contact' => 'static_pages#contact'
  get 'signup'  => 'users#new'
  get 'login'   => 'sessions#new'
  post 'login'  => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'
  get 'password_resets/new'
  get 'password_resets/edit'
  resources :users do
    resources :microposts, only: [:create, :show, :destroy] do
      member do
        get 'statements' => 'microposts#statements'
        post 'replies' => 'microposts#reply'
        get 'replies' => 'microposts#replies'
        post 'repost'
        get 'reposts'
      end
    end

    member do
      get :following, :followers
    end

    get 'timeline' => 'microposts#timeline', type: :user
  end
  get 'microposts' => 'microposts#show'
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]
  resources :relationships,       only: [:create, :destroy]
  get 'styleguide'            => 'styleguide#home'
  get 'styleguide/coding'     => 'styleguide#coding'
  get 'styleguide/scaffolds'  => 'styleguide#scaffolds'
  get 'styleguide/components' => 'styleguide#components'
  get 'styleguide/tips'       => 'styleguide#tips'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
