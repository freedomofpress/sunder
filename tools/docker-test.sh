#!/bin/bash
# docker-test
# This script is intended to be run in the docker container produced by our Dockerfile

# Set up Rust PATH
source /home/node/.cargo/env

xvfb-run --server-args=$XVFB_ARGS make test
