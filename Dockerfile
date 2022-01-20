FROM ruby:3.1.0-slim-bullseye

RUN apt update -y \
    && apt install -y --no-install-recommends \
        locales postgresql-client-13 build-essential nodejs npm yarnpkg cron git libpq-dev \
    && rm -rf /var/lib/apt/lists/*

RUN yarnpkg install --check-files

RUN bundle config --global frozen 1

WORKDIR /app
COPY Gemfile Gemfile.lock ./

RUN bundle install

# Add crontab file in the cron directory
COPY crontab /etc/cron.d/learnawesomecron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/learnawesomecron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

COPY . .

EXPOSE 8443
EXPOSE 3000

CMD ./entrypoint.sh
