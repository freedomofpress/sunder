About Sunder
============

What is Sunder?
---------------

Sunder is a user-friendly graphical interface for cryptographic secret sharing.
Sunder walks you through the two core operations of secret sharing:
generating secret shares, and recovering a secret.

To generate secret shares, Sunder prompts you to choose the secret to be shared,
the size of the group, and the size of the quorum for recovery.
After generating the shares, Sunder provides you with a list of the shares
that may then be saved to files and distributed to a group of people.

Later, after assembling a quorum of individuals with their secret shares,
Sunder can walk you through the process of recovering a secret
from the assembled shares.

Why was Sunder created?
-----------------------

At Freedom of the Press Foundation, we work with news organizations that have
access to sensitive leaked datasets, like the Snowden files or the Panama
Papers, and are tasked with securing those sensitive datasets indefinitely. They
inevitably run into a variety of problems:

-  There will be staff churn - some of the journalists with access to
   the sensitive material will leave the organization and new ones will
   come on.

-  You need to be able to absolutely trust the journalists who are given
   access to begin with. How can you give access to journalists while
   not trusting that one person with an encryption key?

-  You have to worry about someone malicious gaining access to the files
   by stealing them and attempt to break or circumvent the encryption in
   some way.

-  You have to prepare for the ‘hit by the bus’ factor. What if
   something happens where you lose the only journalist(s) who have
   access to a dataset and you are locked out indefinitely?

Secret sharing is a natural solution to this problem;
however, at the time of this writing,
the only available tools for cryptographic secret sharing
were command-line interface (CLI) tools,
which have a high barrier to entry for many users.
We decided that creating a more user-friendly interface for secret sharing
could be beneficial for these users,
and possibly for others as well.

How does Sunder implement secret sharing?
-----------------------------------------

Sunder is built with `Electron`_,
which makes it easy to build cross-platform native applications
using frontend technologies from the web platform.
Sunder uses `Shamir's Secret Sharing`_,
which is implemented in Rust in the `rusty-secrets`_ library.
The JS frontend communicates with the Rust library
via the `rusty-secrets-ffi`_ FFI bindings.

One shortcoming of Shamir's Secret Sharing scheme is that it lacks *integrity*.
If a generated secret share is corrupted,
either accidentally or maliciously,
and used for recovery,
there is no way to detect that an error has occurred
and thus that the resulting output is incorrect.
To resolve this issue,
Sunder uses digital signatures in the following manner:

#. During secret share generation,
   an ephemeral private key is randomly generated.
#. Each secret share is signed with the ephemeral private key.
#. A copy of the signature and the public key for the ephemeral private key
   are appended to each secret share.

During recovery, Sunder verifies:

#. Each provided secret share was signed with the same public key, and
#. Each secret share has a valid signature.

To make Sunder's integrity mechanism as secure as possible
(given that the secret sharing itself is information-theoretically secure),
Sunder uses the `Merkle signature scheme`_,
which is believed to be secure against quantum computers.
Sunder's implementation of Merkle signatures is also written in Rust
and is available at `merkle-sigs.rs`_.

.. _Electron: https://electronjs.org
.. _`Shamir's secret sharing`: https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing
.. _rusty-secrets: https://github.com/SpinResearch/RustySecrets
.. _rusty-secrets-ffi: https://www.npmjs.com/package/rusty-secrets-ffi
.. _`Merkle signature scheme`: https://en.wikipedia.org/wiki/Merkle_signature_scheme
.. _`merkle-sigs.rs`: https://github.com/SpinResearch/merkle_sigs.rs
