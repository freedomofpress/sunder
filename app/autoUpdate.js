const electron = require('electron');
const autoUpdater = electron.autoUpdater;
const currentVersion = require('../package.json').version;
const os = require('os');
const request = require('request');
const repo = 'atom/atom' // TESTING ONLY, change to 'freedomofpress/sunder'


module.exports = function autoUpdate(browserWindow) {

  if (process.platform !== 'linux') {
    const feedUrl = `http://localhost:8000/update/${os.platform()}_${os.arch()}/${currentVersion}`;
    console.log('checking for updates at', feedUrl);
    autoUpdater.setFeedURL(feedUrl);

    autoUpdater.addListener(
      'update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl) => {
        console.log(releaseName, updateUrl);
        electron.dialog.showMessageBox(browserWindow, {
          type: 'info',
          buttons: ['Install & Resart', 'Later'],
          defaultId: 0, // Index of pre-selected button
          title: 'Update Available',
           // Should include change log or something
          message: 'An update has been downloaded',
          detail: 'We recommend you install it now.',
          cancelId: 1, // Return the cancel id if the user closes dialog without clicking a button
        }, (response) => {
          console.log(response);
          if (response === 0) {
            autoUpdater.quitAndInstall();
          } else {
            console.log('canceled');
          }
        });
      });

    autoUpdater.addListener('error', (error) => {
      console.log('encountered error', error.message);
    });

    autoUpdater.addListener('update-not-available', () => {
      console.log('update not found');
    });

    autoUpdater.addListener('update-available', () => {
      console.log('update found');
    });

    autoUpdater.addListener('checking-for-update', () => {
      console.log('checking for update');
    });

    autoUpdater.checkForUpdates();
  } else { // linux
    const options = {
      url: `https://api.github.com/repos/${repo}/releases/latest`,
      headers: {
        'User-Agent': 'Sunder'
      }
    }
    request(options, (error, response, body) => {
      if (error) {
        console.log(error);
        // Fail silently
        return;
      }

      try {
        body = JSON.parse(body);
      } catch (e) {
        console.log(e);
        return;
      }

      if (body.name.indexOf(currentVersion) !== -1) {
        // Up to date
        return;
      }

      electron.dialog.showMessageBox(browserWindow, {
        type: 'info',
        buttons: ['Ok'],
        defaultId: 0, // Index of pre-selected button
        title: 'Update Available',
         // Should include change log or something
        message: 'An update is available',
        detail: `We recommend you install it now through your package manager or by visiting ${body.html_url}.`,
        cancelId: 0, // Return the cancel id if the user closes dialog without clicking a button
      });
    });
  }
};
