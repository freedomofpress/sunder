ARG NODE_VERSION=8.9.4
FROM node:$NODE_VERSION

# Supports building as normal user. Assumes UID of 1000,
# will need to handle USER_ID otherwise. The "node" user
# has uid 1000 by default.
ARG USER_NAME
ENV USER_NAME ${USER_NAME:-node}

RUN apt-get update && apt-get upgrade -y # 2018-02-08

RUN apt-get install -y \
    build-essential \
    libgconf2-dev \
    libgtk2.0-dev \
    libnss3-dev \
    # Required for electron-builder:
    # https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build#linux
    icnsutils \
    graphicsmagick \
    xz-utils

# For compatibility with grsecurity-patched kernels
RUN apt-get install -y paxctl
RUN paxctl -Cm /usr/local/bin/node

RUN mkdir /sunder
RUN mkdir -p /sunder/build/icons
RUN chown -R "$USER_NAME" /sunder
WORKDIR /sunder
USER $USER_NAME
