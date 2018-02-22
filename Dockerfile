ARG NODE_VERSION=8.9.4
FROM node:$NODE_VERSION

# Supports building as normal user. Assumes UID of 1000,
# will need to handle USER_ID otherwise. The "node" user
# has uid 1000 by default.
ARG UID
ENV UID ${UID:-1000}

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
    sudo \
    xz-utils && \
    rm -rf /var/cache/apt/archives/*

RUN if test $UID != 1000 ; then usermod -u $UID node; fi && echo "node ALL=(ALL) NOPASSWD:/bin/sunder-perm-fix" >> /etc/sudoers

# For compatibility with grsecurity-patched kernels and perm clean-up
RUN apt-get install -y paxctl && \
    paxctl -Cm /usr/local/bin/node && \
    rm -rf /var/cache/apt/archives/*

COPY tools/sunder-perm-fix.sh /bin/sunder-perm-fix

RUN chmod +x /bin/sunder-perm-fix

WORKDIR /sunder
USER node
CMD /sunder/tools/build-sunder-debian-packages.sh
