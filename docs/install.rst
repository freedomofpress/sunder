Install Sunder
==============

We provide builds for macOS and Linux on our `GitHub Releases page`_.
For platform-specifc installation instructions, see below.

macOS
-----

#. Download the ``.dmg`` from our `GitHub Releases page`_.
#. Open the ``.dmg`` and drag Sunder to your Applications folder.

Linux (Debian or derivative)
----------------------------

#. Download the .deb from our `GitHub Releases page`_.
#. Open a Terminal and run:

   .. code:: sh

      sudo dpkg -i /path/to/sunder.deb
      sudo apt-get update && sudo apt-get install -yf

#. Type ``sunder`` at your Terminal to launch Sunder.

Tails (Tested on Tails 3.8 and Sunder 0.1.1)
--------------------------------------------

.. warning:: Internet access is required for the initial install.

#. Set up a Tails VM with persistence (see `Tails User Guide`_).
#. Boot into Tails with Persistence and Admin password enabled.
#. Download the .deb from our `GitHub Releases page`_ to the Tor (Persistent) folder.
#. Download the signature (.asc) from our `GitHub Releases page`_ to the Tor (Persistent) folder.
#. Open a terminal and run:

  .. code:: sh

     # Verify the signature
     cd ~/Persistent/Tor\ Browser/
     gpg --verify sunder_0.1.1_amd64.deb.asc
     # Copy Sunder to the persistent volume
     cd ~/Persistent
     mkdir sunder && cd sunder
     cp ~/Persistent/Tor\ Browser/sunder_0.1.1_amd64.deb .
     # Download the dependencies:
     sudo apt update
     apt download gconf2 gconf-service libappindicator1 libgconf-2-4 gconf2-common libdbusmenu-glib4 libdbusmenu-gtk4 libindicator7
     # Install packages and start Sunder:
     sudo dpkg -i *.deb
     sunder

Note that you will need to reinstall Sunder each time you boot into Tails (with persistence and Admin options enabled) by opening a terminal and running:

   .. code:: sh

      cd ~/Persistent/sunder
      sudo dpkg -i *.deb

.. warning:: Updates to Tails may break functionality.

.. _`GitHub Releases page`: https://github.com/freedomofpress/sunder/releases
.. _`Tails User Guide`: https://tails.boum.org/doc/first_steps/index.en.html
