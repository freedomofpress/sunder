#!/bin/bash
set -e
set -u


SUNDER_CODE=/sunder

if [[ ! -d "${SUNDER_CODE}" ]]; then
    printf "${SUNDER_CODE} directory not found!\\n"
    exit 1
fi

icns2png --extract --output "${SUNDER_CODE}/build/icons/" "${SUNDER_CODE}/build/icon.icns"
npm run dist
