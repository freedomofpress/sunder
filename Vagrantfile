# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  # config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.define "sunder" do |sunder|
    sunder.vm.hostname = "sunder"
    sunder.vm.provision "ansible" do |ansible|
      ansible.playbook = "ansible/playbook.yml"
    end
    sunder.vm.provider "virtualbox" do |vb|
      # Building nodejs packages triggers the OOM killer with 512MB of RAM.
      vb.memory = 1024
    end
  end
end
