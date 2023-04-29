# Base image
FROM ubuntu:22.04 AS base

# System dependencies
RUN apt-get update && apt-get install -y \
  build-essential \
  supervisor \
  bash \
  gettext \
  locate \
  autoconf \
  libsqlite3-dev \
  libzip-dev \
  git \
  curl \
  zip \
  unzip \
  ca-certificates \
  sqlite \
  && rm -rf /var/lib/apt/lists/*

# Create app user
RUN groupadd -g 1000 app && useradd -u 1000 -g 1000 app

# Switch to new user
USER app

# Set working directory to app home
WORKDIR /home/app

# Install asdf
RUN git clone https://github.com/asdf-vm/asdf.git .asdf --branch v0.11.2 && \
  echo '. .asdf/asdf.sh' >> .bashrc && \
  echo '. .asdf/asdf.sh' >> .profile

# Set global path
ENV PATH="/home/app/.asdf/shims:/home/app/.asdf/bin:${PATH}"

# Install asdf plugins
RUN asdf plugin-add nodejs

# Install runtimes
COPY .tool-versions .
RUN asdf install

# Setup package manager cache directories and app directory
RUN mkdir -p .npm app

# Set working directory to app
WORKDIR /home/app/app

COPY --chown=app:app . .

FROM base as production

# Install node dependencies and build assets
RUN --mount=type=cache,target=.npm,uid=1000,gid=1000 \
  npm ci && npm run build

EXPOSE 3000
