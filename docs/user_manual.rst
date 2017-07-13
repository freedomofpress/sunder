The Application
~~~~~~~~~~~~~~~

Sunder can be installed on Linux or macOS. It runs entirely offline,
and your data is not sent anywhere. It has two basic functions:
splitting a secret into multiple shares, and recovering a secret *from* the
shares. The application itself should be pretty straightforward. However, there
are several questions that you should think about before diving in.

Threat Model
------------

What are you guarding against?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The way in which you use this tool will vary a great deal based on this
question. You will make very different choices if you are defending yourself
against nation-level sophisticated adversaries versus trying to make sure you
don’t lose a password.

Single Point of Failure
^^^^^^^^^^^^^^^^^^^^^^^

The threat model which Sunder protects most against is the "single
point of failure", by allowing multiple individuals to hold their own
distinct part, or share, of that secret. For example, you can tell
Sunder to divide a secret into eight distinct shares, which you’ll
share with eight different people; in addition, you can also tell
Sunder that you want to require at least five of those eight shares to
be combined in order to reconstruct the original secret. This means that
an adversary must now compromise five different people in order to
obtain their shares; even if the adversary somehow obtained four shares,
they would be meaningless and insufficient for reconstructing the
secret.

People are very familiar with two factor authentication. With Sunder
you’re essentially getting Nfactor authentication with however many
people you give access to.

(Should we mention collusion as a potential issue?)

If your threat model does not include state-level or otherwise
sophisticated adversaries, you can probably forgo many of the
precautions listed below. If this is the case, or if you just want to
test the application out, follow our basic installation instructions to get
it up and running.

What does Sunder consider a secret?
----------------------------------------------

The "secret" for splitting should be a long, complex string, such as a
passphrase for symmetric encryption. For example, a strong passphrase
can be used to decrypt a VeraCrypt volume, or a GPG-encrypted archive
when used with the ``--symmetric`` option. Sunder does not support
directly encrypting files or directories. You should generate a strong
passphrase and encrypt your information with it, for example with
VeraCrypt or GPG, then use Sunder to split the passphrase as a shared
“secret.” Then the protected data will only be recoverable when all
shares come together.

[We will need some guidance here about the Dealer role having total
responsibility for generating and distributing the shares, and
presumably recombining as well.]

Encrypting your file or dataset
-------------------------------

We recommend first encrypting the secret as a VeraCrypt volume with a
very strong key, and then using the key as the secret to be split. The
original key should then be destroyed so that the only way to access the
encrypted volume is by recombining the shares. You should do this entire
process on the offline-only machine so that the passphrase that you
generate is never exposed to a network.

We recommend VeraCrypt, but this same basic process will work for any
file encryption system. VeraCrypt has a good `tutorial for
beginners <https://veracrypt.codeplex.com/wikipage?title=Beginner%27s%20Tutorial>`__,
which we recommend you follow with a few specific modifications.

-  The password should be generated randomly. You can do this in Tails
   by going to ‘Applications > KeePassX’ and then within KeePassX
   ‘Extras > Password Generator’. You should use all 64 characters
   allowed by VeraCrypt. No one will need to remember this password,
   after all. You will use this generated password as the secret to be
   split.

-  We recommend using the layered encryption option
   (AES-Twofish-Serpent). This is slower to encrypt and decrypt, but
   since this will happen only rarely the added security assurance is
   worth the trade-off.


Install Sunder
~~~~~~~~~~~~~~

macOS
-----

1. On Mac download the .dmg and open it from here [link]. On
   Debian-based systems install with
   ``sudo dpkg -i Sunder_0.1.0-1.deb``. For now, Windows is not
   supported.

Tails
-----

1. Download the .deb [link]

2. Verify that it comes from [key]

3. Copy the .deb file to a USB drive.

4. Boot tails on your offline-only computer.

5. Insert the USB containing Sunder and open it in the file explorer.

6. Right click on the background and select ‘Open in terminal’.

7. Type ``sudo dpkg -i Sunder-<version>.deb``, replacing with whatever
   version number you downloaded.

8. If the command completes without error then Sunder is installed! You
   can run it either by typing ``Sunder`` in the terminal or navigating
   to it through the ‘Applications’ menu at the top left. It should be
   under ‘Utilities.’

9. Run the application, either by double-clicking the icon (Mac) or
   typing ``Sunder`` at your terminal (Linux).

Generate Shares
~~~~~~~~~~~~~~~

The process of splitting a secret in Sunder is pretty straightforward.
However there are a couple questions you’ll need to answer before
beginning: How many people do you want to distribute the shares to? How
many of them should be required to unlock the secret? Refer to the "Real
World Examples" section for some ideas.

Ultimately the scheme choice will depend on the specifics of your
organization or group, and the nature of the secret. When you have
decided what scheme you will be using follow these steps:

1. Open the application and you will the screen below. You’re going to
   want to click on "Split a secret"

**[screen shot]**

2. On this screen you will be prompted to enter the secret. Here’s where
   you will either enter a previously generated passphrase that you want
   to split up.

3. Below the passphrase input field you will enter the scheme that you
   have chosen. How many shares do you want to create? How many should
   be required to recover the secret? Enter your choices here.

4. When you have entered all of your choices click ‘Generate shares’.
   **[Note: right now it says "create secret shares"]**

5. On this next screen, you will find an interface for distributing the
   shares. You will see a list of shares, with buttons next to each to
   **Copy** them to the clipboard, or **Save** them to a file. We
   recommend that you **Save** each of them in turn to a separate USB
   drive.

**[screen shot]**

6. Once this is done, you’re all set! You can now click on **Home**.
   You should store these USB drives in a secure place, like a
   locked room or a safe, or on your person. In high threat scenarios,
   these USB drives should *also* be encrypted, which we explain below
   in the next section.

Combine Shares to Recover the Secret
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Recovering the secret will follow the same basic procedure as splitting.

1. Install Sunder if necessary (following the steps above).

2. Open the application and on the home screen, click on the ‘recover a
   secret’ button on the home screen, like below.

**[screen shot]**

3. Click on ‘Select File’ button and navigate to your USB stick where
   your share is located. It should be called something like
   secret-share-1.txt. Choose this share file. (If you’re USB is
   encrypted, you will have to decrypt it first).

**[screen shot]**

4. Click **Continue**.

5. You now should see a blue icon saying 1 out of X shares has been
   entered, as well as an indication of how many more shares are needed.
   If the icon is red, then something has gone wrong. Refer to on-screen
   error messages for more information.

**[screen shot]**

6. Repeat steps 6 and 7 as many times as necessary. If at any time you
   click ‘back’ or close the application, **the entered shares will be
   cleared and your progress lost.**

7. When you enter enough shares to recover the secret, you will see a
   message saying "All shared entered!" and a button called “Recover.”

**[screen shot]**

8. When the big ‘Recover’ button appears click it.

If recovery is successful you should see a green checkmark icon, and
options for what to do with your recovered secret. From this interface
you can open a VeraCrypt volume using the recovered secret as the
passphrase (VeraCrypt must already be installed). If you are doing
something else with the secret you can save it to a file or copy it to
the clipboard as well.

Protecting Highly Sensitive Secrets
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Ideally, you should only use Sunder on a machine that is kept
completely offline. You should copy the shares to encrypted USB drives
which should be kept on the bearer’s person, or in a very safe place at
all times.

[Test this on Tails; under Debian Stretch, there were missing
dependencies from apt.]

Hardware
--------

Before you begin you will need to acquire some hardware. You will need:

1. An air-gapped (entirely offline) machine.

2. A USB with the Tails operating system live image on it..

3. A USB for each of the shares that you intend to distribute.

Specific recommendations for each of these below.

Air-gapped Computer
^^^^^^^^^^^^^^^^^^^

This is a computer that is kept offline and only ever used together with
the Tails operating system. The air-gapped computer will be used to
generate the shares, as well as recover the original secret. Since this
machine will never touch the Internet or run an operating system other
than Tails, it does not need a hard drive or network device; in fact, we
recommend removing these components if they are already present.

Tails USBs
^^^^^^^^^^

You will need at least an 8GB drive to run Tails with an encrypted
persistent partition. We recommend getting something in the 16-64GB
range so you can handle larger secrets without hassle. Anything more
than that is probably overkill.

We strongly recommend getting USB 3.0-compatible drives to run Tails
from. The transfer speeds are significantly faster than USB 2.0, which
means Tails will be much faster and more responsive.

Other than that, the choice of USB drive depends on capacity, form
factor, cost, and a host of other factors.

USBs to store the shares
^^^^^^^^^^^^^^^^^^^^^^^^

The USBs used for distributing shares do not need to be large, any
capacity will do. However the physical size is important. Consider that
if you are asking someone to carry a device on their person, smaller is
undoubtedly better.

You should encrypt the USB drives with a password only the bearer knows.
But keep in mind: While encrypting your USB improves the overall
security of the scheme, passwords that are seldom used tend to be
forgotten. You should format the drives as FAT32 for maximum
compatibility with future devices.

Install Tails
^^^^^^^^^^^^^

The `Tails website <https://tails.boum.org/>`__ has detailed and
up-to-date instructions on how to download and verify Tails, and how to
create a bootable Tails USB drive. Follow the instructions at these
links and then return to this page:

-  `Download and verify the Tails
   .iso <https://tails.boum.org/download/index.en.html>`__

-  `Install onto a USB
   drive <https://tails.boum.org/doc/first_steps/installation/index.en.html>`__

Install Sunder on Tails
-----------------------

The application should be installed on the offline-only machine running
Tails. [link out to install docs above]

When you have created your encrypted volume you should put the secret
data into the volume. Then follow the instructions above for ‘Generating
the shares’ using the password you just generated as the secret.

The last thing to consider is how you will distribute the encrypted
volume itself. This will depend on the specifics your exact situation.
Is maximum redundancy important to you? You should give each participant
in the scheme his or her own copy of the encrypted data. Do you want to
use access to the encrypted volume as an additional layer of security?
Perhaps only a trusted few should keep copies.

Where and how should the shares be kept?
----------------------------------------

Ultimately the best way to keep your secret safe will depend on your
specific situation. Think carefully about who you are protecting the
secret from, and what safe-keeping place will make the share most
difficult to steal. Some good places to keep your Sunder might be:

-  On your keychain, in your physical control at all times.

-  In a safe at your or home, or at your lawyer’s office. Depending on
   your threat model, bank safes may not be not ideal place in some
   situations, as they can be compelled by a legal order without your
   knowledge.

Should the original secret be destroyed?
----------------------------------------

If the intent is to make a secret inaccessible except through the
cooperation of multiple shareholders, then you need to destroy the
original secret. By keeping a copy of it around you are subverting the
security of scheme, since an adversary can ignore the split secret and
simply steal the original. To borrow a cliche, a chain is only as strong
as the weakest link.

However, if you are using this scheme as a backup system, or a way to
ensure that secret is not lost in the event of an untimely death—any
situation in which the split shares are a failsafe and not the primary
means of access—then you should clearly keep the original secret around
for its intended use.

Recovering the secret
---------------------

Recovering the secret will follow the same basic procedure as splitting.
You should perform the recovery on an offline-only Tails machine. You
can reuse the same one you used for splitting, or install Sunder on a
new Tails drive specifically for recovery. You will need to physically
gather a quorum of shareholders in order to perform the recovery.

[ link to recovery docs, with screenshots, above]

Consider scheduling a routine recovery ceremony
-----------------------------------------------

If you plan to store secrets for years at a time, you should seriously
consider the risk that shares will be lost, or passphrases forgotten. As
in most secure systems, the security of Sunder depends on the humans
involved performing their parts as expected. Rather than allow the
shareholders to attempt recovery only in the event of an emergency,
consider setting a time for a recurring recovery ceremony, to test the
validity of the distributed shares over time. Doing so will help prevent
problems with hardware failure, as well as ensure sound storage
practices in secure locations.

What to do if a share is lost or stolen
---------------------------------------

What you need to do in the event that a share is lost or stolen will
depend on the details of your scheme. If enough of your shares go
missing you will lose access to the secret—or worse, someone else may
gain access. To prevent that, you can re-key the secret and
re-distribute new shares. You do this by recovering the original secret,
and then splitting it again into new shares. After you re-key a secret
you should destroy the old shares.

When exactly you do this will depend on your personal tolerance for
risk, and the parameters of your scheme. For example, if you distribute
only three shares and require that two of them are needed to recover the
secret, you would want to re-key after any one of the shares goes
missing. On the other hand if you distribute a dozen shares and require
that a quorum of five them be present to recover the secret, then you
might tolerate the loss of two or three before re-keying.

You should make it very clear to the shareholders that they should
notify every other shareholder if their share goes missing.

What to do if someone leaves the organization
---------------------------------------------

You should treat this case as if the key belonging to that person has
been lost and follow the steps above.
