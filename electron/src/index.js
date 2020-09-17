/* jshint esversion: 6 */
// import { app, BrowserWindow } from 'electron';
const electron = require('electron');
const path = require('path');
const log = require('electron-log');

const host = 'http://admin.emenu.onionm.com';
// const host = 'http://localhost:8079';
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let loadingScreen;
const windowParams = {
  width: 800,
  height: 600,
  show: false,
};

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow(windowParams);
  // and load the index.html of the app.
  mainWindow.loadURL(`${host}/orders/confirmApp`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    if (loadingScreen) {
      const loadingScreenBounds = loadingScreen.getBounds();
      mainWindow.setBounds(loadingScreenBounds);
      loadingScreen.close();
      mainWindow.maximize();
    }
  });


  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  mainWindow.setMenu(null);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createLoadingScreen();
  createWindow();
});


// Quit when all windows are closed.
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

const fs = require('fs');
// const os = require('os');
const ipc = electron.ipcMain;
const shell = electron.shell;

/**
 * 转化成PDF并保存
 */
ipc.on('print-to-pdf', (event) => {
  // const pdfPath = path.join(os.tmpdir(), 'print.pdf');
  const pdfPath = path.join('/Users/ison/Downloads/0/', 'print.pdf');
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
  // mainWindow = new BrowserWindow({ width: 790, height: 800 });
  mainWindow.loadURL(`${host}/orders/printTicket?orderCode=${arg}`);
  // mainWindow.loadURL(path.join(__dirname, '/print-preview.html'));
  mainWindow.setMenu(null);
  mainWindow.webContents.on('did-finish-load', () => {
    // log.info(mainWindow.webContents.getPrinters());
    mainWindow.webContents.print({ silent: false, printBackground: false, deviceName: '' });
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

  const orderCode = arg.orderCode;
  const prints = arg.prints;
  // log.info(prints);

  printWindow.loadURL(`${host}/orders/printTicket?orderCode=${orderCode}`);
  printWindow.webContents.on('did-finish-load', () => {
    // log.info(printWindow.webContents.getPrinters());
    let num = 0;
    for (const name in prints) {
      num = prints[name];
      // log.info(name);
      // log.info(num);
      for (let i = 0; i < num; i += 1) {
        printWindow.webContents.print({ silent: true, printBackground: false, deviceName: name });
      }
    }
  });
});


ipc.on('print', (event, arg) => {
  // log.info('aaaa');
  mainWindow.webContents.print(arg);
});

