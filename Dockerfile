# FROM nileshtrivedi/ubuntu1804ruby3:1.0
FROM ruby:3.0.1-buster

RUN apt update -y \
    && apt install -y --no-install-recommends \
        locales postgresql-client build-essential nodejs npm curl ca-certificates gnupg redis-tools cron \
    && rm -rf /var/lib/apt/lists/*

# upgrade postgresql-client for pg_dump
RUN curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt buster-pgdg main" > /etc/apt/sources.list.d/postgresql.list' 
RUN apt update -y && apt install -y --no-install-recommends postgresql-client-13

ENV LANGUAGE en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN npm install -g yarn
RUN yarn install --check-files

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

