ARG NODE_VERSION=8.9.4
FROM node:$NODE_VERSION

# Supports building as normal user. Assumes UID of 1000,
# will need to handle USER_ID otherwise. The "node" user
# has uid 1000 by default.
ARG USER_NAME
ENV USER_NAME ${USER_NAME:-node}

RUN apt-get update && apt-get upgrade -y # 2018-02-08 && \
    rm -rf /var/cache/apt/archives/*

RUN apt-get install -y --no-install-recommends  \
    graphicsmagick \
    # Required for electron-builder:
    # https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build#linux
    icnsutils \
    libgconf2-dev \
    libgtk2.0-dev \
    libnss3-dev \
    xz-utils && \
    rm -rf /var/cache/apt/archives/*

# For compatibility with grsecurity-patched kernels
RUN apt-get install -y paxctl && \
    paxctl -Cm /usr/local/bin/node

COPY . /sunder

RUN mkdir -p /sunder/build/icons && \
    chown -R "$USER_NAME" /sunder

WORKDIR /sunder
RUN npm install
USER $USER_NAME
