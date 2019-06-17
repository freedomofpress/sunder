# Sunder

**Important:** As of June 2019, Freedom of the Press Foundation has discontinued its work on the Sunder project.
For actively maintained implementations of Shamir's Secret Sharing, consider using [Mozilla SOPS](https://github.com/mozilla/sops/)
or [Hashicorp Vault](https://github.com/hashicorp/vault).

----------

![Sunder user interface](https://sunder.readthedocs.io/en/latest/_images/create_secret_shards_filled.png)

Sunder is an implementation of [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) based on the [RustySecrets](https://github.com/SpinResearch/RustySecrets) library. It is alpha-quality software and has not been audited. Please see [the documentation](https://sunder.readthedocs.io/en/latest/) for details.

## Development

You will need Node and NPM. We use Node LTS for Sunder development, most recently Node v8.9.4 and NPM v5.6.0. Prior versions of Node and NPM may also work, but we are not trying to maintain compatability with them at this time.

To perform secret splitting and recovery, Sunder depends on [`rusty-secrets`](http://github.com/SpinResearch/rustysecrets-node), a native module written in [Rust](http://rust-lang.org).

This package requires a stable version of the Rust toolchain. Please see the [Rust documentation](https://www.rust-lang.org/en-US/install.html) for installation instructions.

If you have questions or comments, you can [join us in our Gitter chat room](https://gitter.im/freedomofpress/sunder).

### Quickstart

1. Clone the git repository
2. `npm install`
3. `npm run dev`

For development use `npm run dev`. This does two things: it starts an electron instance with development features enabled, and it starts a webpack dev server. The dev server is to enable 'hot module reloading', which means that changes to the source on your file system will be reflected in the running application code in real time.

If you get an error from `node-gyp` during `npm install`, note that it expects `python` to resolve to Python 2.x.

### Testing

- To run the unit tests: `make test-unit`
- For development you might enjoy the continuously updating tests: `npm run test-watch`
- The end-to-end integration suite can be run with `make test-e2e`.
  Note that this runs agains built code, so `npm run build-app` will run beforehand.
- To run all tests, use `make test`. Again, `npm run build-app` will run before the integration tests.

## Building

### Linux

Linux packages are built in a docker container, so they can be
built on either Linux or Mac OS X. You will need to install the following
prerequisites for the build environment:

1. [Docker](https://docs.docker.com/install/)

Once you have the prerequisites installed, you should be able to

```
make build-deb
```

Packages will be found in `dist/`.

### OS X

To package up the app for your current platform (e.g. OS X):

```
make build-dmg
```

Note that this will run `build-app` so there's no need to run that beforehand.

Packages will be stored in `dist/<platform>`.

#### Code Signing

Code signing is handled automatically by the `electron-builder` package. All you should need to do is add the signing identity through xcode, and electron-builder will discover it automatically. See [Apple documentation](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/MaintainingCertificates/MaintainingCertificates.html) and [electron-builder documentation](https://github.com/electron-userland/electron-builder/wiki/Code-Signing) for more info.

## Documentation

### Editing the docs

Install the requirements (use of virtualenv is highly recommended), then
pull up a live reload interface for editing:

```
pip install -r requirements.txt
make docs
```

### Linting the docs

You can check for common syntax and formatting errors in the documentation
without pushing to CI:

```
make docs-lint
```

The linting process will rebuild all local assets from scratch, so it cannot
be used at the same time as `make docs`.

## License

[BSD 3-Clause License](/LICENSE)
