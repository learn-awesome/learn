[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/learn-awesome/learn) 

# LearnAwesome

[![Twitter](https://img.shields.io/badge/-Twitter-0a0a0a.svg?style=flat&colorA=0a0a0a)](https://twitter.com/learn_awesome)

#### Awesome learning resources organized by topics, formats and difficulty. Optimal learning paths for any topic.

<img width="100%" src="https://user-images.githubusercontent.com/19304/94602661-cbb4f380-02b2-11eb-81aa-419e4c4a53b2.png">

This is the code that powers https://learnawesome.org

This is built using Rails 6.0, PostgreSQL, and Tailwind CSS

For development, please come to [Slack](https://learnawesome.org/join_slack).

# To Do

- Improve the [mobile app](https://github.com/learn-awesome/mobile-app)

- Improve automatic extraction of metadata such as topics,images etc from links to books, videos, courses etc.

- Improve the topic hierarchy for easy navigation.

- Improve the browser extension and the flashcard module.

- Add richer metadata to items so that advanced search becomes more useful.

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

To import some data:
```
rake import:import['public/data1.json'] import:import['public/data2.json'] mrb:import_experts
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

For GraphQL clients, first send the user to https://learnawesome.eu.auth0.com/login?client=h5wMQw9p9MsN53nkY4YeN08mv3Ao1mnB&protocol=oauth2&response_type=token%20id_token&redirect_uri=http://localhost:3000/callback&scope=openid%20profile

After successful login/signup, `user.authinfo` will have a field called `id_token`.
The value of that token can be used as the `Authorization` header with `Bearer` prefix. This ensures that user can only perform permitted operations via graphQL api.
