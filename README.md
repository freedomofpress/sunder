# Secret Share


## Development
You need a recent version of Node.js and NPM installed. Tested with:

* v4.1.0
* v5.7.0

### Quickstart
1. Clone the git repository
2. `npm install`
3. `npm run dev`

For development use `npm run dev`. This does two things: it starts an electron instance with development features enabled, and it starts a webpack dev server. The dev server is to enable 'hot module reloading', which means that changes to the source on your file system will be reflected in the running application code in real time.

### Testing

- To run the unit tests: `npm run test`
- For development you might enjoy the continuously updating tests: `npm run test-watch`
- The end-to-end integration suite can be run with `npm run test-e2e`. Note that this runs agains built code, so an `npm run build-app` is prudent and/or necessary.

## Building

### Quickstart
Requires Ansible and Vagrant for building Linux packages. Run:

```
make build
```

to create a VM and run a full build of the Linux packages.
To build the OS X packages, read on.

### Step-by-step (required for OS X)
Compile the CSS and JavaScript:

```
npm run build-app
```


The built assets end up in the `dist/` folder. Once the assets have been built,
open the app in production mode:

```
npm start
```

With built assets, you can now package up the app for your current platform (e.g. OS X):

```
npm run dist
```

Packages will be stored in `release/`.
