Sunder Overview and FAQ
~~~~~~~~~~~~~~~~~~~~~~~

What is Sunder?
---------------

Sunder is a user-friendly computer application that allows news
organizations to more securely encrypt large files or datasets for long
periods of time. It implements a classic distributed trust model - known
as Shamir’s Secret Sharing - for sensitive material that allows news
organizations to avoid trusting any one journalist with a large
sensitive dataset.

This application works by splitting the "secret" - the complex
passphrase protecting the files - into shares such that a subset of them
can be recombined to recover the original secret. The individual shares
can be distributed to people and places that you trust. You can choose
how many shares to create, and how many of them are required to
reconstitute the secret.

In this way, trust and risk can be distributed across many different
people or locations, so that the compromise, coercion, or error of any
small number of them does not result in the loss or theft of the secret.

How is this useful to journalists?
----------------------------------

News organizations increasingly have access to sensitive leaked datasets
- like the Snowden files or the Panama Papers - and are forced to take
care of and secure those files indefinitely. They inevitably run into a
variety of problems:

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

How does it work?
-----------------

Sunder is an easy-to-use graphical interface that allows you to take
text or files and encrypt them while splitting the encryption key into a
number of ‘secret shares’ of your choice, which can then be distributed
to any number of journalists on your team. You can then designate how
many of those shares have to be combined to open the file.

For example, if you have ten journalists you want to distribute trust
to, Sunder will generate a passphrase for each of the ten journalists to
keep. The news organization can then designate how many journalists will
need to use their passphrase to open the file. You can set it to any
number you choose - two of the ten journalists can be used to open it,
or all ten, or any number in between.

This way you don’t have to trust any one person to keep the passphrase
secure - and you can ratchet up the security depending on the number of
people you distribute a secret share to.

Has this existed before?
------------------------

The underlying idea behind Sunder is called Shamir’s Secret Sharing, and
has been around for decades. Shamir’s Secret Sharing is a cryptographic
concept where a secret is divided into parts, giving each participant
its own unique part, where some of the parts or all of them are needed
in order to reconstruct the secret.

This type of program has been available in proprietary versions to large
corporations and government agencies before, but has been incredibly
burdensome to implement for non-technical users. Sunder creates a much
easier way for small organizations to use the concept of Shamir’s Secret
Sharing without going through an incredibly complicated process.

How secure is it?
---------------------

Shamir’s Secret Sharing scheme is *information-theoretically secure*.
What this means is that it’s secure against an adversary with infinite
computing power; this is due to the fact that nothing about the secret
is leaked if you have fewer than the required number of shares necessary
to rebuild it. This notion of security even predates Shamir’s Secret
Sharing by several decades, as it was developed over the mid to late
1940s by the father of information theory, Claude Shannon.

However, the software is currently an alpha release. While we hope users
to try it out and give us feedback, and we hope developers and security
experts will join in on the open-source development of the project, we
strongly recommend **AGAINST** anyone using it for potentially
life-threatening situations.

Why would I use this?
---------------------

-  **Security** - If you have a very important file or document whose
   theft would be devastating, this tool might be of interest. By
   splitting a secret into many shares, you make it exponentially harder
   for an attacker to compromise the secret, because they have to
   compromise several of the shares to recover the original.

-  **Redundancy** - If you have a secret that must not be lost, it is
   bad practice to keep it in only one place, or in only one person’s
   head. By splitting a secret you can store the shares in many
   different places—geographically or with different people--so that the
   loss of one of the shares does not mean the loss of the secret. Doing
   this with Sunder is better than simply copying the original secret
   because the shareholders do not have individual access to the secret,
   nor can the secret be stolen by compromising any individual backup
   location.

-  **Distributed trust** - Splitting a secret means that no person has
   access to it when acting alone. Accessing the secret requires the
   cooperation and consent of some number of other people.

When is this not appropriate?
-----------------------------

-  **Frequent access** - If you need to access the secret frequently,
   daily or even weekly, this is probably not the right scheme for you.
   Reconstituting the secret requires that a quorum of the shareholders
   are present. If that is going to be a burden then you consider other
   options.

What are other real world examples?
-----------------------------------

While the application we are releasing is aimed at journalists, secret
splitting can be useful in other areas beyond journalism. For example:

-  **Access after death** - Some people use this scheme to share their
   passwords with close friends and relatives so that their digital
   lives can be accessed in the event of their passing or becoming
   incapacitated. If enough of your friends and family agree that you
   would want them to recover the secret and access your documents, then
   they have that capability, but otherwise none of them alone can do
   so.

-  **Signing keys** - If your organization publishes signed software,
   you might want to cryptographically enforce a two-developer rule,
   i.e. never sign something unless two developers agree that it should
   be signed. One way to accomplish this would be to use Shamir’s
   scheme, which has the added benefit of making your key harder to
   steal.

-  **Backup access to personal secrets** - This tool can also be used in
   cases where the secrets are distributed not to people, but to
   isolated hard drives. For example you might backup a key by placing
   one share on a USB key you carry with you, one on a backup hard
   drive, and one on a personal computer (with a two-of-three splitting
   scheme). This setup would allow you to recover a lost key as long you
   still had two of three (USB, hard drive, or computer).

-  **Bitcoin** - The keys to the cold-storage vaults of `at least one
   major bitcoin company are
   secured <https://medium.com/the-coinbase-blog/how-coinbase-builds-secure-infrastructure-to-store-bitcoin-in-the-cloud-30a6504e40ba#.5qukxh1q5>`__
   using this scheme. The shares of the secret are distributed to
   trusted executives and board members. So if the funds need to be
   accessed, that can only be done by consensus. This is an example of
   an extremely sensitive secret (perhaps a $100 million secret), that
   also must not be lost (because the money would be lost with it). This
   is also a nice example of distribution of trust, where no single
   person should be unilaterally trusted with the secret.
