# Learn Awesome

[![Gitter](https://img.shields.io/badge/-Gitter-0a0a0a.svg?style=flat&colorA=0a0a0a)](https://gitter.im/learn-awesome/community)
[![Twitter](https://img.shields.io/badge/-Twitter-0a0a0a.svg?style=flat&colorA=0a0a0a)](https://twitter.com/learn_awesome)

#### Awesome learning resources organized by topics, formats and difficulty.


# Development Setup with Docker

One-time commands can be run as:
```
docker-compose run web rake db:drop db:create db:migrate db:seed
docker-compose run web rake import:import['public/data1.json']
docker-compose run web rake import:import['public/data2.json']
```

Need to specigy `hostname: db`, `username: postgres` and `password: ` in `config/database.yml`.

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

Set-up caching in dev:
`rails dev:cache`

Start the app with some secrets:
```
SECRET_KEY_BASE=462487da70bd5a66aa230b387f61737d642b52c7d3b576e93413eddfc25fc8144eb52d19ae42d4bd8c4521f97e53956e0b3d8b4dba587f9edc7e8dbcc5238e8f AUTH0_DOMAIN= AUTH0_PUBKEY= AUTH0_PRIVKEY= rails s

Either use your own Auth0 tenant (which needs some configuration) or contact us to get the values of the above environment variables.
```

For the admin interface, login at http://localhost:3000/admin/ panel using `admin@example.com` and `password`.
