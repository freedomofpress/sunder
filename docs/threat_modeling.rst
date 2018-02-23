Threat Modeling
===============

Before attempting to use secret sharing to protect sensitive data,
consider your threat model.
Threat modeling is a complex topic
that is mostly outside the scope of this documentation,
but there are a few key things to consider when threat modeling for secret sharing.

Choosing the secret
-------------------

Secret sharing can be used on arbitrary data,
but it works best on relatively small amounts of data.
To avoid potential problems with recovering excessively large secrets,
Sunder limits the size of the secret to be shared to 1MB or less.
If you wish to protect a larger, or variable, amount of data,
you should encrypt the data
and use secret sharing on the corresponding secret key or passphrase.

Note that, in most cases,
secret sharing is only as secure as the underlying secret being shared.
If you encrypt your data with a weak passphrase or key,
your adversary might be able to circumvent secret sharing
by guessing or recovering the underlying secret instead.
Always use the strongest possible key or passphrase when encrypting data
for use in a secret sharing system.

Separating the underlying data to be protected
from the secret to be shared can also be beneficial
because it allows you to protect the data and the secret independently.
For example, you could store an encrypted hard drive in a safe in your office,
and use secret sharing on the passphrase to allow a select group of
colleagues to access it.
An adversary now has to compromise a quorum of your colleagues,
your office's security,
and the security of the safe in order to access your data.
If the data and the secret were kept together,
they would only need to compromise a quorum of your colleagues to obtain it.


Choosing a computer
-------------------

Depending on your threat model,
you might want to consider taking some precautions
with the computer you will use to run Sunder,
because it will have access to your secret
during share generation and secret recovery.

For example,
if you believe your personal computer might be compromised,
you could boot into a different operating system, such as `Tails`_,
to run Sunder.
This would be a significant improvement over using your everday PC,
but would still be vulnerable to more sophisticated attacks such as `LightEater`_.
You could further harden such a setup by using a separate machine for Sunder,
perhaps even purchasing a dedicated machine solely for the purpose.

The most secure option of all is to use a dedicated airgapped computer.
At Freedom of the Press Foundation,
we have accomplished this task in a couple of ways.

One option is to build a dedicated PC from parts,
leaving out the hardware necessary for both wired and wireless network communication.
If you go this route,
check the specs to make sure there is no onboard wireless networking capability,
a "feature" that has become more widespread in recent years.

Another option is to modify an old desktop or laptop,
removing all of the wired and wireless networking components.
In our experience,
old Lenovo Thinkpads are relatively easily to convert into dedicated airgapped computers.

.. _Tails: https://tails.boum.org/
.. _LightEater: https://www.youtube.com/watch?v=sNYsfUNegEA

Storing secret shares
---------------------

The secret shares themselves are are small (>1kb) chunks of text data
that are most easily stored as files on some form of removable media (CD/DVD-ROM, USB, etc.)

Since secret sharing is information theoretically secure,
your adversary has no choice but to attempt to recover
a quorum of secret shares from members of your group.
Depending on your threat model,
you may want to take additional precautions
to protect the secret shares that are in your care.

For example,
if you store your share as a file on a removable USB drive,
you might consider encrypting the drive to protect it
in the event that it is stolen or copied surreptitiously.
If you choose to encrypt your shares,
take care to avoid forgetting the corresponding passphrase,
a mistake that is easily made when encrypting data
that only needs to be accessed infrequently.
We have found it useful to schedule periodic reminders
to verify access to important secrets.
It helps refresh your memory of
the procedure for accessing the secrets
as well as any related passphrases that you might have memorized.

Depending on your threat model,
you might also consider precuations for the physical security of your secret shares.
There are two approaches that we think are worthwhile:

#. Make it harder to steal the share
   
   - e.g. Store it in a safe or safe deposit box

#. Make it harder to steal the share without being detected
   
   - e.g. Keep it with you at all times by storing it on a USB key on your keyring
