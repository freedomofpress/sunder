Welcome to Sunder
=================

.. warning:: As of June 2019, Sunder is no longer undergoing active development,
   and will not receive security fixes. The repository has been archived.
   For actively maintained implementations of Shamir's Secret Sharing,
   consider using `Mozilla SOPS`_ or `Hashicorp Vault`_.

Sunder is a user-friendly graphical interface for cryptographic secret sharing.

If you're new to cryptographic secret sharing,
we recommend reading
:doc:`understanding_secret_sharing`,
:doc:`about_sunder`,
and :doc:`threat_modeling`
before trying to use Sunder.

Once you understand the concepts behind Sunder,
you might be interested in learning how to :doc:`install`.
Once installed,
you can use it to :doc:`generate_secret_shares` or :doc:`recover_secret`.

Cryptographic secret sharing is suitable for a variety of possible use cases.
For a quick overview,
check out :ref:`why-use-secret-sharing` and :ref:`real-world-examples`.

The code is open source, and `available on GitHub`_.

.. _available on GitHub: https://github.com/freedomofpress/sunder
.. _Mozilla SOPS: https://github.com/mozilla/sops
.. _Hashicorp Vault: https://github.com/hashicorp/vault

.. toctree::
   :caption: Topic Guides
   :name: topic_guides
   :maxdepth: 2

   understanding_secret_sharing
   about_sunder
   threat_modeling

.. toctree::
   :caption: User Documentation
   :name: user_documentation
   :maxdepth: 2

   install
   generate_secret_shares
   recover_secret
