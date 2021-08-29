FROM gitpod/workspace-postgres

USER gitpod

# Install Ruby version 3.0.1 and set it as default
RUN echo "rvm_gems_path=/home/gitpod/.rvm" > ~/.rvmrc
RUN bash -lc "rvm install ruby-3.0.1 && rvm use ruby-ruby-3.0.1 --default"
RUN echo "rvm_gems_path=/workspace/.rvm" > ~/.rvmrc

ENV RACK_ENV development
ENV RAILS_ENV development
ENV DATABASE_PORT 5432
ENV DATABASE_NAME learndb
ENV DATABASE_USERNAME learn
ENV DATABASE_PASSWORD learn
ENV RAILS_LOG_TO_STDOUT enabled
ENV RAILS_SERVE_STATIC_FILES enabled

# Install Node and Yarn
# ENV NODE_VERSION=14.14.0
# RUN bash -c ". .nvm/nvm.sh && \
#        nvm install ${NODE_VERSION} && \
#        nvm alias default ${NODE_VERSION} && \
#        npm install -g yarn"
#  ENV PATH=/home/gitpod/.nvm/versions/node/v${NODE_VERSION}/bin:$PATH

# If we need Redis:
# RUN sudo apt-get update && sudo apt-get install -y redis-server && sudo rm -rf /var/lib/apt/lists/*

# Install custom tools, runtime, etc. using apt-get
# For example, the command below would install "bastet" - a command line tetris clone:
#
# RUN sudo apt-get -q update && #     sudo apt-get install -yq bastet && #     sudo rm -rf /var/lib/apt/lists/*
#
# More information: https://www.gitpod.io/docs/config-docker/
