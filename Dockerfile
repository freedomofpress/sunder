ARG NODE_VERSION=8.15.1
FROM node:$NODE_VERSION
# Using these to provide advanced pruning later
LABEL org="Freedom of the Press"
LABEL image_name="sunder"

# Supports building as normal user. Assumes UID of 1000,
# will need to handle USER_ID otherwise. The "node" user
# has uid 1000 by default.
ARG UID
ENV UID ${UID:-1000}

RUN apt-get update && apt-get upgrade -y # 2018-02-08 && \
    rm -rf /var/cache/apt/archives/*

# Required for electron-builder:
# https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build#linux
RUN apt-get install -y --no-install-recommends  \
    graphicsmagick \
    icnsutils \
    libgconf2-dev \
    libgtk2.0-dev \
    libnss3-dev \
    sudo \
    xz-utils && \
    rm -rf /var/cache/apt/archives/*

# Required for starting electron
RUN apt-get install -y --no-install-recommends  \
    libgtk-3-0 \
    libx11-xcb1 \
    libxtst6 \
    libxss1 \
    libasound2 \
    xvfb xauth \
    && rm -rf /var/cache/apt/archives/*

# Install python for building docs with sphinx
RUN apt-get update && \
    apt-get install -y python python-dev python-pip python-virtualenv && \
    rm -rf /var/cache/apt/archives/*

# Install sphinx and related python requirements
COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt && \
    rm /tmp/requirements.txt


RUN if test $UID != 1000 ; then usermod -u $UID node; fi && echo "node ALL=(ALL) NOPASSWD:/bin/sunder-perm-fix" >> /etc/sudoers

# For compatibility with grsecurity-patched kernels and perm clean-up
RUN apt-get install -y paxctl && \
    paxctl -Cm /usr/local/bin/node && \
    rm -rf /var/cache/apt/archives/*

COPY tools/sunder-perm-fix.sh /bin/sunder-perm-fix

RUN chmod +x /bin/sunder-perm-fix

WORKDIR /sunder
USER node

# Install Rust under `node` user home directory
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

CMD /sunder/tools/build-sunder-debian-packages.sh
