Rails.application.config.middleware.insert_after Rails::Rack::Logger, Rack::Cors, :debug => true, :logger => Rails.logger do
    allow do
      origins 'chat.learnawesome.org'
  
      resource '/rocketchat*',
        headers: :any,
        credentials: true,
        methods: [:get, :post, :put, :patch, :delete, :options, :head]
    end
end