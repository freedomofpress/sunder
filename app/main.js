const electron = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new electron.BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  if (process.env.DEBUG) {
    mainWindow.webContents.openDevTools();
  }

  // Dereference the main window on close so it gets garbage collected.
  mainWindow.on('closed', () => mainWindow = null);
}

const app = electron.app;

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On OS X don't quit when all window's closed.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// More special casing for OS X, open a new window if the dock is clicked and
// the application never fully quit.
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
