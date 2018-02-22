#!/bin/bash
set -e
set -u


SUNDER_CODE=/sunder

if [[ ! -d "${SUNDER_CODE}" ]]; then
    printf "${SUNDER_CODE} directory not found!\\n"
    exit 1
fi

function img_extract() {
    icns2png --extract --output "${SUNDER_CODE}/build/icons/" "${SUNDER_CODE}/build/icon.icns"
}

function perm_fix() {
    # Fix permissions on named volume and npm install
    sudo /bin/sunder-perm-fix
}

function npm_install() {
    npm install
}

function build() {
    if [ -d /proc/sys/kernel/grsecurity/ ]; then
        # build and hacky re-run for grsec users
        npm run dist || find /home/node/.cache/ -type f -name ruby -exec paxctl -cm '{}' \;
        npm run dist
    else
        npm run dist
    fi
}


img_extract
perm_fix
npm_install
build
