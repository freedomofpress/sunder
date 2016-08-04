.PHONY: ansible build clean-build

ansible:
	ansible-galaxy install -r ansible/requirements.yml -p ansible/roles

build:
	make ansible
	vagrant up --provision

clean-build:
	vagrant destroy --force
	make build
