# FROM nileshtrivedi/ubuntu1804ruby3:1.0
FROM ruby:3.0.1-buster

RUN apt update \
    && apt install -y --no-install-recommends \
        postgresql-client build-essential nodejs npm \
    && rm -rf /var/lib/apt/lists/*

RUN npm install yarn

RUN bundle config --global frozen 1

WORKDIR /usr/src/app
COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY . .

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]

