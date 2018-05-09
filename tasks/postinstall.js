const fs = require('fs');
const path = require('path');
const electronBuildEnv = require('electron-build-env');


// Symlink source folder into node_modules to allow for absolute imports
const target = '../src';
const symlink = 'node_modules/src';
fs.lstat(symlink, (e, stats) => {
  if (e) {
    fs.symlink(target, symlink, 'dir', (err) => { if (err) { console.log(err); } });
  } else if (!stats.isSymbolicLink()) {
    console.log(`WARNING: ${symlink} exists but is not a symlink.`);
  }
});

// Rebuild rusty-secrets native module for Electron
console.log('\nRebuilding `rusty-secrets` native module for Electron...');
electronBuildEnv(["neon", "build", "rusty-secrets"], function(err) {
  if (err) {
    console.error(`ERROR: Build failed: ${err}`);
  } else {
    console.log('SUCCESS: Build succeeded!');
  }
});
