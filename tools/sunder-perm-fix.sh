#!/bin/bash

if [[ -d "/sunder/node_modules" ]]; then
    chown -R node /sunder/node_modules
fi
