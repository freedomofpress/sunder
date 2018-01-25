const fs = require('fs');
const path = require('path');


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
