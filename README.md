# README

This is a personalized learning app.

```
bundle install
rake db:drop db:create db:migrate db:seed
```

To import data from the JSON files:
```
rake import:import['public/data1.json']
rake import:import['public/data2.json']
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
