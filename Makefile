# Declare subcommands as "phony" targets, since they're not directories.
.PHONY: ansible clean build clean-build help

ansible:
	ansible-galaxy install -r ansible/requirements.yml -p ansible/roles

clean:
	rm -rf dist/
	rm -rf build/icons/*.png
	rm -rf ansible/roles/geerlingguy.nodejs
	rm -rf node_modules/
	rm -rf app/node_modules/

build:
	make ansible
	vagrant up --provision

clean-build:
	vagrant destroy --force
	make clean
	make build

help:
	@echo Makefile for building sunder packages.
	@echo Subcommands:
	@echo "\t ansible: Fetch dependency Ansible roles for NodeJS config."
	@echo "\t clean: Remove previously built binaries from dist/ directory."
	@echo "\t build: Creates a Vagrant VM and builds Linux packages."
	@echo "\t clean-build: Cleans project, then builds Linux packages."
