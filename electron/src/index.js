/* jshint esversion: 6 */
// import { app, BrowserWindow } from 'electron';

const electron = require('electron');
const path = require('path');
const os = require('os');

// const host = 'http://admin.emenu.onionm.com';
const host = 'http://cloud-printer.local';
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow;
let loadingScreen;
const windowParams = {
  width: 800,
  height: 600,
  show: false,
};

const createWindow = () => {
  mainWindow = new BrowserWindow(windowParams);
  // mainWindow.loadURL(`${host}/windows`);
  mainWindow.loadFile('src/index.html');

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    if (loadingScreen) {
      const loadingScreenBounds = loadingScreen.getBounds();
      mainWindow.setBounds(loadingScreenBounds);
      loadingScreen.close();
      mainWindow.maximize();
    }
  });

  // mainWindow.webContents.openDevTools();
  mainWindow.setMenu(null);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

function createLoadingScreen() {
  loadingScreen = new BrowserWindow(Object.assign(windowParams, { parent: mainWindow }));
  loadingScreen.loadURL(path.join(__dirname, '/loading.html'));
  loadingScreen.on('closed', () => { loadingScreen = null; });
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
}

app.on('ready', () => {
  createLoadingScreen();
  createWindow();
});


app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  app.quit();
  // }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});


const fs = require('fs');
// const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;

/**
 * 转化成PDF并保存
 */
ipc.on('print-to-pdf', (event, arg) => {
  const pdfPath = path.join(os.tmpdir(), `${arg}.pdf`);
  const win = BrowserWindow.fromWebContents(event.sender);
  // Use default printing options
  win.webContents.printToPDF({}, (error, data) => {
    if (error) throw error;
    fs.writeFile(pdfPath, data, (error1) => {
      if (error1) {
        throw error1;
      }
      shell.openExternal(`file://${pdfPath}`);
      event.sender.send('wrote-pdf', pdfPath);
    });
  });
});


/**
 * 预览打印
 */
ipc.on('print-preview', (event, arg) => {
  mainWindow = new BrowserWindow({ width: 440, height: 800 });
  // mainWindow.loadURL(`${host}/orders/printTicket?orderCode=${arg}`);
  mainWindow.loadFile('src/print-preview.html');
  mainWindow.setMenu(null);
  mainWindow.webContents.on('did-finish-load', () => {
    // log.info(mainWindow.webContents.getPrinters());
    setTimeout(function () {
      mainWindow.webContents.print({ silent: false, printBackground: false, deviceName: '' });
    }, 1000);
  });
});

/**
 * 静默打印
 */
let printWindow;
ipc.on('print-silent', (event, arg) => {
  printWindow = new BrowserWindow({ show: false });
  // log.info(arg);
  // log.info(arg.prints);
  // log.info(arg.orderCode);

  const printName = arg;
  // log.info(prints);
  // printWindow.loadURL(`${host}/orders/printTicket?orderCode=${orderCode}`);
  printWindow.loadFile('src/print-preview.html');

  // console.log(printWindow.webContents.getPrinters());
  setTimeout(function () {
    // eslint-disable-next-line max-len
    printWindow.webContents.print({ silent: true, printBackground: false, deviceName: printName }, function (success) {
      if (success) {
        console.log('print success');
      }
    });
  }, 2000);

});


ipc.on('print', (event, arg) => {
  // log.info('aaaa');
  mainWindow.webContents.print(arg);
});

