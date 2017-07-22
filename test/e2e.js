const Application = require('spectron').Application;
import path from 'path';
import { expect } from 'chai';
import electronPath from 'electron';

const appPath = path.join(__dirname, '..');

describe('main window', function spec() {
  this.timeout(5000);

  let shares = []; // Store the generated shares for recovery
  const quorum = 2;
  const numShares = 3;
  const secret = 'test secret';

  let app;

  before(async () => {
    app = new Application({
      path: electronPath,
      env: { SPECTRON: true },
      args: [appPath],
    });
    await app.start();
  });

  after(async () => {
    await app.stop();
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
    await app.client.waitForExist('.share-row');
    const shareEls = await app.client.elements('.share-row');
    expect(shareEls.value).to.have.length(3);
  });

  it('should copy the share values to the clipboard and store them', async () => {
    for (let i = 0; i < quorum; i++) {
      await app.client.element(`#share-${i+1} .copy`).click();
      const share = await app.electron.clipboard.readText();
      shares.push(share);
    }
  });

  it('should go back to the home screen', async () => {
    await app.client.element('.btn-back').click();
  });

  it('should navigate to recover', async () => {
    await app.client.element('#recover-button').click();
  });

  it('should input the shares', async () => {
    for (let i = 0; i < quorum; i++) {
      const copiedSecret = await app.electron.clipboard.writeText(shares[i]);
      await app.client.execute("window.dispatchEvent(new Event('focus'))");
      await app.client.element('.paste').click();
    }
  });

  it('should click the finish recovery button', async () => {
    await app.client.element('#finish-recovery').click();
  });

  it('should click view secret button', async () => {
    await app.client.waitForExist('#view-secret-button');
    await app.client.element('#view-secret-button').click();
  });

  it('should have the right secret revealed', async () => {
    await app.client.waitForVisible('.secret-view');
    const foundSecret = await app.client.getAttribute('.secret-view', 'value');
    expect(foundSecret).to.be.eql(secret);
    await app.client.element('.btn*=Hide').click();
  });

  it('should be able to copy the recovered secret', async () => {
    // Make sure the clipboard is clear before copying
    await app.electron.clipboard.clear();
    await app.client.element('.copy').click();
    const copiedSecret = await app.electron.clipboard.readText();
    expect(copiedSecret).to.be.eql(secret);
  });
});
