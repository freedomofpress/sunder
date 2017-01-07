import path from 'path';
import chromedriver from 'chromedriver';
import webdriver from 'selenium-webdriver';
import { expect } from 'chai';
import electronPath from 'electron-prebuilt';

chromedriver.start(); // on port 9515
process.on('exit', chromedriver.stop);

const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('main window', function spec() {
  this.timeout(5000);
  let shares; // Store the generated shares for recovery
  const quorum = 2;
  const numShares = 3;
  const secret = 'test secret';

  before(async () => {
    await delay(1000); // wait chromedriver start time
    this.driver = new webdriver.Builder()
      .usingServer('http://localhost:9515')
      .withCapabilities({
        chromeOptions: {
          binary: electronPath,
          args: [`app=${path.resolve()}`]
        }
      })
      .forBrowser('electron')
      .build();
  });

  after(async () => {
    await this.driver.quit();
  });

  it('should open window', async () => {
    const title = await this.driver.getTitle();
    expect(title).to.equal('Secret Splitter');
  });

  it('should click on the split button', async () => {
    await this.driver.findElement({ id: 'split-button' }).click();
  });

  it('should enter some bogus data on the split screen', async () => {
    await this.driver.findElement({ name: 'secret' }).sendKeys(secret);
    await this.driver.findElement({ name: 'quorum' }).sendKeys(quorum);
    await this.driver.findElement({ name: 'shares' }).sendKeys(numShares);
    await this.driver.findElement({ id: 'create-shares' }).click();
  });

  it('should find the right number of shares on distribute screen', async () => {
    await delay(2100); // wait for fake delay
    const shareEls = await this.driver.findElements({ className: 'share-row' });
    expect(shareEls).to.have.length(3);
  });

  it('should find and store the share values', async () => {
    // Depends on implementation of the copy button, less than ideal.
    const secretShareEls = await this.driver.findElements({ css: 'input[readonly]' });
    return Promise.all(secretShareEls.map((el) => el.getAttribute('value'))).then((values) => {
      // Store in global for later use
      shares = values;
    });
  });

  it('should go back to the home screen', async () => {
    await this.driver.findElement({ className: 'btn-back' }).click();
  });

  it('should navigate to recover', async () => {
    await this.driver.findElement({ id: 'recover-button' }).click();
  });

  it('should select text input', async () => {
    await this.driver.findElement({ css: 'option[value="text"]' }).click();
  });

  it('should input the shares', async () => {
    for (let i = 0; i < quorum; i++) {
      await this.driver.executeScript(
        "arguments[0].value = arguments[1]; arguments[0].dispatchEvent(new Event('blur'));",
        this.driver.findElement({ name: 'share' }),
        shares[i]);
      await delay(1000);
      await this.driver.findElement({ id: 'submit-share-button' }).click();
      await delay(1000);
    }
  });

  it('should click the finish recovery button', async () => {
    await this.driver.findElement({ id: 'finish-recovery' }).click();
    await delay(2100); // wait for fake delay
  });

  it('should click view secret button', async () => {
    await this.driver.findElement({ id: 'view-secret-button' }).click();
  });

  it('should have the right secret revealed', async () => {
    const foundSecret = await this.driver.findElement({ className: 'secret-view' })
        .getAttribute('value');
    expect(foundSecret).to.be.eql(secret);
  });
});
