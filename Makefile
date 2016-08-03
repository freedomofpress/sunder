.PHONY: ansible build clean

ansible:
	ansible-galaxy install -r ansible/requirements.yml -p ansible/roles

build:
	make ansible
	vagrant up --provision

clean:
	vagrant destroy --force
	make build
