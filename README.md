# LearnAwesome

[![Chat for users](https://img.shields.io/badge/-Gitter-0a0a0a.svg?style=flat&colorA=0a0a0a)](https://gitter.im/learn-awesome/community)
[![Chat for developers](https://img.shields.io/badge/-Gitter-0a0a0a.svg?style=flat&colorA=0a0a0a)](https://gitter.im/learn-awesome/community)
[![Twitter](https://img.shields.io/badge/-Twitter-0a0a0a.svg?style=flat&colorA=0a0a0a)](https://twitter.com/learn_awesome)

#### Awesome learning resources organized by topics, formats and difficulty. Optimal learning paths for any topic.

This is the code that powers https://learnawesome.org

This is built using Rails 6.0, PostgreSQL, Bootstrap 4 and [Stream Dashboard UI Kit](https://htmlstream.com/templates/stream-dashboard-ui-kit).

For development, please come to [Gitter](https://gitter.im/learn-awesome/meta). There's also a [community chat room](https://gitter.im/learn-awesome/community).

# Development Setup with Vagrant

```
vagrant up
vagrant provision

# connect to vm
vagrant ssh

# Start the app in vm. Make sure to specify Auth0 creds. Ask us if you don't have your own.
SECRET_KEY_BASE=462487da70bd5a66aa230b387f61737d642b52c7d3b576e93413eddfc25fc8144eb52d19ae42d4bd8c4521f97e53956e0b3d8b4dba587f9edc7e8dbcc5238e8f AUTH0_DOMAIN= AUTH0_PUBKEY= AUTH0_PRIVKEY= rails s -b 0.0.0.0

# To destroy the vm
vagrant destroy

```

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
# These two lines are not needed in local development unless you're testing ActivityPub flows
export ACTIVITYPUB_PRIVKEY=`cat private.pem`
export ACTIVITYPUB_PUBKEY=`cat public.pem`

SECRET_KEY_BASE=462487da70bd5a66aa230b387f61737d642b52c7d3b576e93413eddfc25fc8144eb52d19ae42d4bd8c4521f97e53956e0b3d8b4dba587f9edc7e8dbcc5238e8f AUTH0_DOMAIN= AUTH0_PUBKEY= AUTH0_PRIVKEY= rails s

Either use your own Auth0 tenant (which needs some configuration) or contact us to get the values of the above environment variables.
```

For the admin interface, login at http://localhost:3000/admin/ panel using `admin@example.com` and `password`.
★★★☆☆
