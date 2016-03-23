// TODO: REMOVEME
function randomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-$&@#!';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function getFakeShare(options) {
  return `${options.quorum}-${randomString(options.length)}`;
}


/**
 * TODO: Implement this through node-ffi.
 * @param   {string} secret The secret to be split.
 * @param   {Object} options
 * @param   {number} options.shares The total number of shares to generate.
 * @param   {number} options.quorum The number of shares required to recover.
 * @returns {Promise<Array<string>>} The resulting list of shares.
 */
export function splitFFI(secret, options) {
  /* eslint-disable no-unused-vars */
  return new Promise((resolve, reject) => {
    /* eslint-enable */
    // Return some fake data after a second.
    setTimeout(() => {
      const fakeData = [];
      for (let i = 0; i < options.shares; i++) {
        fakeData.push(getFakeShare({
          quorum: options.quorum,
          length: secret.length
        }));
      }

      resolve(fakeData);
    }, 1000);
  });
}


/**
 * TODO: implement this with ffi.
 * @param   {Array<string>} shares The list of shares to attempt recovery with.
 * @returns {Promise<string>} The decrypted secret.
 */
export function recoverFFI(shares) {
  /* eslint-disable no-unused-vars */
  return new Promise((resolve, reject) => {
    /* eslint-enable */
    // Return some fake data after a second.
    setTimeout(() => resolve(randomString(shares[0].length)), 1000);
  });
}
