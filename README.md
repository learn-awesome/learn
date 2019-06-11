# README

This is a personalized learning app.

```
bundle install
rake db:drop db:create db:migrate db:seed
```

Add secret keys and domain for auth0:
```
EDITOR=vi bin/rails credentials:edit
```

Start the app
```
rails s
```
Login to the http://localhost:3000/admin/ panel using `admin@example.com` and `password`.
