/* eslint-disable camelcase */
import { expect } from 'chai';
const rusty_secrets = require('rusty-secrets');

describe('smoke test for crypto lib', () => {
  it('should recover the passed secret successfully', (complete) => {
    const mime = 'img/test';
    const secret = Buffer.from('This is the test secret', 'ascii');

    rusty_secrets.generate_shares(2, 3, secret, mime, (err, shares) => {
      if (err) {
        throw new Error(`An error occured during generation: ${err}`);
      }

      rusty_secrets.recover_secret(shares, (error, rec_secret, mime_recovered) => {
        if (error) {
          throw new Error(`An error occured during recovery: ${error}`);
        }

        expect(rec_secret.equals(secret)).to.be.true();
        expect(mime_recovered === mime).to.be.true();
        complete();
      });
    });
  });
});
