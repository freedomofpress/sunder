/* eslint-disable camelcase */
import { expect } from 'chai';
const rusty_secrets = require('rusty-secrets').wrapped;

describe('smoke test for crypto lib', () => {
  it('should recover the passed secret successfully', (complete) => {
    const mime = 'img/test';
    const secret = Buffer.from('This is the test secret', 'ascii');
    const SIGN_SHARES = true;

    rusty_secrets.splitSecret(2, 3, secret, mime, SIGN_SHARES, (err, shares) => {
      if (err) {
        throw new Error(`An error occured during generation: ${err}`);
      }

      rusty_secrets.recoverSecret(shares, SIGN_SHARES, (error, recovered) => {
        if (error) {
          throw new Error(`An error occured during recovery: ${error}`);
        }

        expect(recovered.secret.equals(secret)).to.be.true();
        expect(recovered.mimeType === mime).to.be.true();
        complete();
      });
    });
  });
});
