DEFAULT_GOAL: help

# For mounting local code into build container
PWD := $(shell pwd)
UID := $(shell id -u)

.PHONY: clean
clean: docker-clean ## Removes all build-related artifacts
	rm -rf dist/
	rm -rf build/icons/*.png
	rm -rf node_modules/
	rm -rf app/node_modules/

.PHONY: docker-build
docker-build: ## Builds Docker image for creating Sunder Linux deb packages
	docker build . --build-arg=UID=$(UID) -t sunder-build

.PHONY: build-deb
build-deb: docker-build ## Builds Sunder Debian packages for Linux
	docker volume create fpf-sunder-node && \
	docker run \
		-v $(PWD):/sunder \
		-v fpf-sunder-node:/sunder/node_modules \
		sunder-build:latest

.PHONY: npm-install-init
npm-install-init: ## Installs npm modules locally only if node_modules/ absent
	if [ ! -d node_modules ] ; then \
		npm install ; \
	fi

.PHONY: build-dmg
build-dmg: npm-install-init ## Builds Sunder DMG and app bundle for macOS (requires macOS)
	npm run dist

.PHONY: docker-clean
docker-clean: ## Purges Docker images related to building Sunder deb packages
	tools/docker-clean

.PHONY: docs-clean
docs-clean: ## Removes built artifacts for local documentation editing
# Create required static dirs
	mkdir -p docs/_static docs/_build
# Remove any previously build static files
	make -C docs/ clean

.PHONY: docs-lint
docs-lint: docs-clean ## Checks for formatting errors in local documentation
# The `-W` option converts warnings to errors.
# The `-n` option enables "nit-picky" mode.
	sphinx-build -Wn docs/ docs/_build/html

.PHONY: docs
docs: docs-clean ## Runs livereload environment for local documentation editing
# Spins up livereload environment for editing; blocks.
	sphinx-autobuild docs/ docs/_build/html

.PHONY: build-app
build-app: npm-install-init ## Packages Electron app locally via webpack for development and testing
	npm run build-app

.PHONY: test-unit
test-unit: npm-install-init ## Runs unit tests in local dev env
	npm run test

.PHONY: test-e2e
test-e2e: npm-install-init build-app ## Runs end-to-end integration tests local dev env
	npm run test-e2e

.PHONY: test
test: test-unit test-e2e docs-lint ## Runs all unit and integration tests

# Explanation of the below shell command should it ever break.
# 1. Set the field separator to ": ##" to parse lines for make targets.
# 2. Check for second field matching, skip otherwise.
# 3. Print fields 1 and 2 with colorized output.
# 4. Sort the list of make targets alphabetically
# 5. Format columns with colon as delimiter.
.PHONY: help
help: ## Prints this message and exits
	@printf "Makefile for developing and testing Sunder.\n"
	@printf "Subcommands:\n\n"
	@perl -F':.*##\s+' -lanE '$$F[1] and say "\033[36m$$F[0]\033[0m : $$F[1]"' $(MAKEFILE_LIST) \
		| sort \
		| column -s ':' -t
