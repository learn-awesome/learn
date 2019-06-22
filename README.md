# Learn Awesome

[![Gitter](https://img.shields.io/badge/-Gitter-0a0a0a.svg?style=flat&colorA=0a0a0a)](https://gitter.im/learn-awesome/community)
[![Twitter](https://img.shields.io/badge/-Twitter-0a0a0a.svg?style=flat&colorA=0a0a0a)](https://twitter.com/learn_awesome)

#### Awesome learning resources organized by topics, formats and difficulty.


# Development Setup with Docker

Put the master key (get from core team) in `config/master.key`. This is needed for Auth0-based authentication to work. If you have set up a tenant on Auth0 yourself, just modify `config/initializers/auth0.rb`. Please be sure NOT to commit `master.key` file in version control.

One-time commands can be run as:
```
docker-compose run web rake db:drop db:create db:migrate db:seed
docker-compose run web rake import:import['public/data1.json']
docker-compose run web rake import:import['public/data2.json']
```

Then the app can be launched with `docker-compose up`

# Local install

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
For the admin interface, login at http://localhost:3000/admin/ panel using `admin@example.com` and `password`.
