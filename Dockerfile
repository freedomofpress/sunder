ARG NODE_VERSION=8.9.4
FROM node:$NODE_VERSION

# Supports building as normal user. Assumes UID of 1000,
# will need to handle USER_ID otherwise. The "node" user
# has uid 1000 by default.
ARG UID
ENV UID ${UID:-1000}

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

RUN if test $UID != 1000 ; then usermod -u $UID node; fi && echo "node ALL=(ALL) NOPASSWD:/bin/sunder-perm-fix" >> /etc/sudoers

COPY tools/sunder-perm-fix.sh /bin/sunder-perm-fix

COPY tools/sunder-perm-fix.sh /bin/sunder-perm-fix

RUN chmod +x /bin/sunder-perm-fix

WORKDIR /sunder
USER node
CMD /sunder/tools/build-sunder-debian-packages.sh
