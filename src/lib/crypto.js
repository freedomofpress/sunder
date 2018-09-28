import { remote } from 'electron';
const cryptoFFI = remote.require('rusty-secrets');

// IMPORTANT: Do not change this value, as this would break backward
//            compatibility with previously emitted shares.
const SIGN_SHARES = true;

/**
 * Parses a share to recover the parameters that generated it.
 * @param {string} share The share to parse.
 * @returns {Object} An object containing quorum, the version of the share,
 *   format and the random id of the secret.
 */
export function parseShare(share) {
  const components = share.split('-');

  return {
    quorum: parseInt(components[0], 10),
    shareNum: parseInt(components[1], 10),
    secretData: components[2]
  };
}


/**
 * @param   {Buffer} secret The secret to be split.
 * @param   {Object} options
 * @param   {number} options.shares The total number of shares to generate.
 * @param   {number} options.quorum The number of shares required to recover.
 * @returns {Promise<Array<string>>} The resulting list of shares.
 */
export function splitFFI(secret, options) {
  return new Promise((resolve, reject) => {
    const mimeType = options['mimeType'] || '';
    cryptoFFI.wrapped.splitSecret(
      options.quorum,
      options.shares,
      // This needs to be a buffer
      secret,
      mimeType,
      // Sign shares
      SIGN_SHARES,
      (err, shares) => {
        if (err) {
          return reject(err);
        }

        resolve(shares);
      });
  });
}


/**
 * @param   {Array<string>} shares The list of shares to attempt recovery with.
 * @returns {Promise<Buffer>} The decrypted secret.
 */
export function recoverFFI(shares) {
  return new Promise((resolve, reject) => {
    cryptoFFI.wrapped.recoverSecret(
      shares,
      SIGN_SHARES, // Verify signatures if shares have been signed
      (err, result) => {
      if (err) {
        return reject(err);
      }

      resolve(result);
    });
  });
}
