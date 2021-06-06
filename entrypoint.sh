#!/bin/bash
set -m

# Remove a potentially pre-existing server.pid for Rails.
rm -rf /app/tmp/pids/server.pid
rm -rf /app/tmp/cache/*

echo "Waiting for postgres $DATABASE_NAME to become ready...."
PG_READY="pg_isready -h $DATABASE_HOST -p $DATABASE_PORT -U $DATABASE_USERNAME"

until $PG_READY
do
  sleep 2;
done

echo "Database ready to accept connections."

# Create DATABASE_NAME if necessary
# exec bundle exec rake db:create

# Run migrations and start background job processor
bundle exec rake db:migrate
bundle exec rake jobs:work &
cron &

if [[ "$RAILS_ENV" == "production" ]]; then
  bundle exec rake assets:precompile
fi

bundle exec puma -C config/puma.rb
