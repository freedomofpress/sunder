import { remote } from 'electron';
/* eslint-disable camelcase */
const child_process = remote.require('child_process');
/* eslint-enable */


// There is some work to do to make this work cross-platform.
// The VeraCrypt linux installer puts a symlink to the binary in /usr/bin,
// but the Mac installer doesn't (annoyingly). The Windows binary has a
// different interface entirely, documented at
// https://veracrypt.codeplex.com/wikipage?title=Command%20Line%20Usage.
let binary;
let fallbackBinary;
if (process.platform === 'darwin') {
  binary = '/Applications/VeraCrypt.app/Contents/MacOS/VeraCrypt';
  fallbackBinary = 'veracrypt';
} else if (process.platform === 'linux') {
  binary = 'veracrypt';
} else if (process.platform === 'win32') {
  binary = 'VeraCrypt.exe';
}

export function openVolume(path, password) {
  let args = ['--mount', path, '--password', password, '--explore'];
  if (process.platform === 'win32') {
    args = ['/volume', path, '/password', password, '/explore'];
  }

  if (!binary) {
    return Promise.reject('Unsupported platform');
  }

  return execPromise(binary, args)
    .catch((errObj) => {
      if (fallbackBinary) {
        return execPromise(fallbackBinary, args);
      }
      return errObj;
    });
}

export function detectVeraCrypt() {
  if (process.platform === 'darwin' || process.platform === 'linux') {
    return execPromise('which', [binary])
      .then(() => true)
      .catch(() => {
        if (!fallbackBinary) {
          return false;
        }

        return execPromise('which', [fallbackBinary])
          .then(() => true)
          .catch(() => false);
      });
  } else if (process.platform === 'win32') {
    return execPromise('where.exe', [binary])
      .then(() => true)
      .catch(() => false);
  }
}

function execPromise(cmd, args) {
  return new Promise((resolve, reject) => {
    child_process.execFile(cmd, args, (err, stdout, stderr) => {
      if (err) {
        reject(parseErrors({ err, stderr }));
      }

      resolve(stdout);
    });
  });
}

function parseErrors(errObj) {
  let message = 'Something went wrong while running VeraCrypt.';
  if (errObj.err.code === 'ENOENT') {
    message = "Unable to find VeraCrypt, are you sure it's installed?";
  }

  return message;
}
