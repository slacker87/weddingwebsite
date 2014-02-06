Swiftrickertwedding::Application.routes.draw do

root  to: 'static_pages#index'

match '/help',  to: 'static_pages#help', via: 'get'
match '/date', to: 'static_pages#date', via: 'get'
match '/venue', to: 'static_pages#venue', via: 'get'
match '/contact', to: 'static_pages#contact', via: 'get'
match '/photos', to: 'static_pages#photos', via: 'get'

end
