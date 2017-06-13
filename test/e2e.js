const Application = require('spectron').Application;
import path from 'path';
import { expect } from 'chai';
import electronPath from 'electron';

const appPath = path.join(__dirname, '..');

const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('main window', function spec() {
  this.timeout(5000);
  let shares; // Store the generated shares for recovery
  const quorum = 2;
  const numShares = 3;
  const secret = 'test secret';

  let app;

  before(() => {
    app = new Application({
      path: electronPath,
      env: { SPECTRON: true },
      args: [appPath],
    });
    return app.start();
  });

  after(() => {
    return app.stop();
  });

  it('should open window', async () => {
    const title = await app.client.getTitle();
    expect(title).to.equal('Sunder');
  });

  it('should click on the split button', async () => {
    await app.client.element('#split-button').click();
  });

  it('should enter some bogus data on the split screen', async () => {
    await app.client.element('[name=secret]').setValue(secret);
    await app.client.element('[name=quorum]').setValue(quorum);
    await app.client.element('[name=shares]').setValue(numShares);
    await app.client.element('#create-shares').click();
  });

  it('should find the right number of shares on distribute screen', async () => {
    await delay(2100); // wait for fake delay
    const shareEls = await app.client.elements('.share-row');
    expect(shareEls.value).to.have.length(3);
  });

  it('should find and store the share values', async () => {
    // Depends on implementation of the copy button, less than ideal.
    shares = await app.client.getAttribute('input[readonly]', 'value');
  });

  it('should go back to the home screen', async () => {
    await app.client.element('.btn-back').click();
  });

  it('should navigate to recover', async () => {
    await app.client.element('#recover-button').click();
  });

  it('should select text input', async () => {
    await app.client.selectByValue('div.file-or-text-mode-select-container select', 'text')
  });

  it('should input the shares', async () => {
    for (let i = 0; i < quorum; i++) {
      await app.client.execute(
        "var el = document.querySelector(arguments[0]); el.value = arguments[1]; el.dispatchEvent(new Event('blur'));",
        '[name=share]',
        shares[i]);
      await app.client.element('#submit-share-button').click();
    }
  });

  it('should click the finish recovery button', async () => {
    await app.client.element('#finish-recovery').click();
    await delay(2100); // wait for fake delay
  });

  it('should click view secret button', async () => {
    await app.client.element('#view-secret-button').click();
  });

  it('should have the right secret revealed', async () => {
    const foundSecret = await app.client.element('.secret-view')
        .getAttribute('value');
    expect(foundSecret).to.be.eql(secret);
  });
});
