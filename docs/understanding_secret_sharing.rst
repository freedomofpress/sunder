Understanding Secret Sharing
============================

What is secret sharing?
-----------------------

Secret sharing refers to a family of cryptographic techniques
for securely sharing a secret among a group of people.
An abitrary secret, such as a passphrase or a cryptographic key,
is split into a chosen number of secret shares
such that a quorum of the shares may be used to recover the secret.
The size of the group and the size of the quorum are configurable,
and are chosen prior to generating the secret shares.

For more detail and additional examples, see `Wikipedia`_.

.. _Wikipedia: https://en.wikipedia.org/wiki/Secret_sharing

.. _why-use-secret-sharing:

Why would I want to use secret sharing?
---------------------------------------

Secret sharing is best suited for high-security use cases where a combination of
one or more of the following properties is desired:

-  **Security**: If you have a very important file or document whose
   theft would be devastating, this tool might be of interest. By
   splitting a secret into many shares, you make it exponentially harder
   for an attacker to compromise the secret, because they have to
   compromise several of the shares to recover the original.

-  **Redundancy**: If you have a secret that must not be lost, it is
   bad practice to keep it in only one place, or in only one person’s
   head. By splitting a secret you can store the shares in many
   different places—geographically or with different people--so that the
   loss of one of the shares does not mean the loss of the secret. Doing
   this with Sunder is better than simply copying the original secret
   because the shareholders do not have individual access to the secret,
   nor can the secret be stolen by compromising any individual backup
   location.

-  **Distributed trust**: Splitting a secret means that no person has
   access to it when acting alone. Accessing the secret requires the
   cooperation and consent of a configurable quorum of other people.

When is secret sharing not appropriate?
---------------------------------------

- **Frequent access**: If you need to access the secret frequently,
  daily or even weekly, this is probably not the right scheme for you.
  Reconstituting the secret requires that a quorum of the shareholders
  are present. If that is going to be a burden then you should
  consider other options.

.. _real-world-examples:

What are some real world examples?
----------------------------------

While the application we are releasing is aimed at journalists, secret
splitting can be useful in other areas beyond journalism. For example:

-  **Access after death**: Some people use this scheme to share their
   passwords with close friends and relatives so that their digital
   lives can be accessed in the event of their passing or becoming
   incapacitated. If enough of your friends and family agree that you
   would want them to recover the secret and access your documents, then
   they have that capability, but otherwise none of them alone can do
   so.

-  **Signing keys**: If your organization publishes signed software,
   you might want to cryptographically enforce a two-developer rule,
   i.e. never sign something unless two developers agree that it should
   be signed. One way to accomplish this would be to use Shamir’s
   scheme, which has the added benefit of making your key harder to
   steal.

-  **Backup access to personal secrets**: This tool can also be used in
   cases where the secrets are distributed not to people, but to
   isolated hard drives. For example you might backup a key by placing
   one share on a USB key you carry with you, one on a backup hard
   drive, and one on a personal computer (with a two-of-three splitting
   scheme). This setup would allow you to recover a lost key as long you
   still had two of three (USB, hard drive, or computer).

- **Cryptocurrency**: The keys to the cold-storage vaults of
  `at least one major Bitcoin company`_ are secured using this scheme. The
  shares of the secret are distributed to trusted executives and
  board members.  So if the funds need to be accessed, that can only
  be done by consensus.  This is an example of an extremely sensitive
  secret, worth perhaps millions or billions of USD, that also must
  not be lost (because the money would be lost with it). This is also
  a nice example of distribution of trust, where no single person
  should be unilaterally trusted with the secret.

.. _`at least one major Bitcoin company`: https://medium.com/the-coinbase-blog/how-coinbase-builds-secure-infrastructure-to-store-bitcoin-in-the-cloud-30a6504e40ba#.5qukxh1q5

How secure is secret sharing?
-----------------------------

`Shamir's secret sharing`_, the secret sharing system used in Sunder,
achieves `information-theoretic security`_, which is the highest level
of security possible for any cryptosystem. An adversary with fewer
than the quorum number of secret shares learns no information about
the underlying secret, and so cannot derive any benefit from potential
future advances in computing power, including quantum computing.

Such a high security level is ideal for the practical applications of
secret sharing, since it allows you to protect sensitive data in the
long-term, even in the face of unknown future advances in computing
power or cryptanalytic capabilty.

.. _`Shamir's secret sharing`: https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing
.. _`information-theoretic security`: https://en.wikipedia.org/wiki/Information-theoretic_security
