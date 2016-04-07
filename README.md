# Quickstart

You need a recent version of Node.js and NPM installed.

**Tested with:**

* v4.1.0
* v5.7.0

1. Clone the git repository
2. `npm install`
3. `npm run dev`

# Building

- For development use `npm run dev`. This does two things: it starts an electron instance with development features enabled, and it starts a webpack dev server. The dev server is to enable 'hot module reloading', which means that changes to the source on your file system will be reflected in the running application code in real time.
- `npm run build-app` will compile the css and JavaScript. The built assets end up in the `dist/` folder.
- Once the assets have been built `npm start` will open the app in production mode.
- With built assets you can run `npm run package` to package up the app for your current platform.
- `npm run package-all` will build the app once for each platform (linux, OS X, Windows)/architecture (x64, ia32 as applicable) combination. Wine is required to build Windows .exe's on non-Windows systems. [More details](https://github.com/electron-userland/electron-packager). Packaged artifacts are stored in `releases/`

# Testing

- To run the unit tests: `npm run test`
- For development you might enjoy the continuously updating tests: `npm run test-watch`
- The end-to-end integration suite can be run with `npm run test-e2e`. Note that this runs agains built code, so an `npm run build-app` is prudent and/or necessary.
