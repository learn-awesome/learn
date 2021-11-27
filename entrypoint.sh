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

if [[ "$RAILS_ENV" == "development" ]]; then
  echo "Running rake db:drop db:create ..."
  bundle exec rake db:drop db:create
fi

# Run migrations and start background job processor
echo "Running DB migrations..."
bundle exec rake db:migrate

echo "Migrations completed. Starting background job processor..."
bundle exec rake jobs:work &

echo "Starting cron..."
cron &

if [[ "$RAILS_ENV" == "development" ]]; then
  echo "Running rake db:seed ..."
  bundle exec rake db:seed
  bundle exec rake import:import['public/data1.json']
fi

if [[ "$RAILS_ENV" == "production" ]]; then
  echo "Pre-compiling assets..."
  bundle exec rake assets:precompile
fi

echo "Starting puma..."
bundle exec puma -C config/puma.rb
