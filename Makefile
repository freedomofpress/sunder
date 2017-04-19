# Declare subcommands as "phony" targets, since they're not directories.
.PHONY: ansible clean build clean-build help

ansible:
	ansible-galaxy install -r ansible/requirements.yml -p ansible/roles

clean:
	rm -rf release/

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
	@echo "\t clean: Remove previously built binaries from release/ directory."
	@echo "\t build: Creates a Vagrant VM and builds Linux packages."
	@echo "\t clean-build: Cleans project, then builds Linux packages."
