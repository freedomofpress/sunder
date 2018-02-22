# Declare subcommands as "phony" targets, since they're not directories.
.PHONY: ansible clean build clean-build help docs docs-lint

# For mounting local code into build container
PWD := $(shell pwd)

UID := $(shell id -u)

ansible:
	ansible-galaxy install -r ansible/requirements.yml -p ansible/roles

clean:
	rm -rf dist/
	rm -rf build/icons/*.png
	rm -rf ansible/roles/geerlingguy.nodejs
	rm -rf node_modules/
	rm -rf app/node_modules/

docker-build: ## Builds Docker image for creating Sunder Linux deb packages.
	docker build . --build-arg=UID=$(UID) -t sunder-build

build: docker-build ## Builds Sunder Debian packages for Linux.
	docker volume create fpf-sunder-node && \
	docker run \
		-v $(PWD):/sunder \
		-v fpf-sunder-node:/sunder/node_modules \
		sunder-build:latest

clean-build:
	vagrant destroy --force
	make clean
	make build

.PHONY: docs-clean
docs-clean:
# Create required static dirs
	mkdir -p docs/_static docs/_build
# Remove any previously build static files
	make -C docs/ clean

.PHONY: docs-lint
docs-lint: docs-clean
# The `-W` option converts warnings to errors.
# The `-n` option enables "nit-picky" mode.
	sphinx-build -Wn docs/ docs/_build/html

.PHONY: docs
docs: docs-clean
# Spins up livereload environment for editing; blocks.
	sphinx-autobuild docs/ docs/_build/html

help:
	@echo Makefile for building sunder packages.
	@echo Subcommands:
	@echo "\t ansible: Fetch dependency Ansible roles for NodeJS config."
	@echo "\t clean: Remove previously built binaries from dist/ directory."
	@echo "\t build: Creates a Vagrant VM and builds Linux packages."
	@echo "\t clean-build: Cleans project, then builds Linux packages."
	@echo "\t docs: Build project documentation in live reload for editing."
	@echo "\t docs-lint: Check documentation for common syntax errors."
