import { remote } from 'electron';
/* eslint-disable camelcase */
const child_process = remote.require('child_process');
/* eslint-enable */

export default function openVolume(path, password) {
  // There is some work to do to make this work cross-platform.
  // The VeraCrypt linux installer puts a symlink to the binary in /usr/bin,
  // but the Mac installer doesn't (annoyingly). The Windows binary has a
  // different interface entirely, documented at
  // https://veracrypt.codeplex.com/wikipage?title=Command%20Line%20Usage.
  let binary;
  let fallbackBinary;
  let args = ['--mount', path, '--password', password, '--explore'];
  if (process.platform === 'darwin') {
    binary = '/Applications/VeraCrypt.app/Contents/MacOS/VeraCrypt';
    fallbackBinary = 'veracrypt';
  } else if (process.platform === 'linux') {
    binary = 'veracrypt';
  } else if (process.platform === 'win32') {
    binary = 'VeraCrypt.exe';
    args = ['/volume', path, '/password', password, '/explore'];
  } else {
    return Promise.reject('Unsupported platform');
  }

  return execPromise(binary, args)
    .catch((errObj) => {
      if (fallbackBinary) {
        return execPromise(fallbackBinary, args)
          .catch(parseErrors);
      }
      return errObj;
    }).catch(parseErrors);
}

function execPromise(cmd, args) {
  return new Promise((resolve, reject) => {
    child_process.execFile(cmd, args, (err, stdout, stderr) => {
      if (err) {
        reject({ err, stderr });
      }

      resolve(stdout);
    });
  });
}

function parseErrors(errObj) {
  // TODO: Figure out if this needs to be better
  return errObj.err;
}
