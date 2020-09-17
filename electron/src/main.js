// import { app, BrowserWindow } from 'electron';
const electron = require('electron');

const host = 'http://localhost:8079';
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });
  mainWindow.maximize();
  // and load the index.html of the app.
  mainWindow.loadURL(`${host}/orders/confirm`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

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
const path = require('path');

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
  mainWindow = new BrowserWindow({ width: 790, height: 800 });
  mainWindow.loadURL(`${host}/printSilent?orderCode=${arg}`);
  mainWindow.setMenu(null);
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('request', arg);
  });
});

/**
 * 静默打印
 */
ipc.on('print-silent', (event, arg) => {
  mainWindow = new BrowserWindow({ show: false });
  mainWindow.loadURL(`${host}/printSilent?orderCode=${arg}`);
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('request', arg);
  });
});
ipc.on('print', (event, arg) => {
  mainWindow.webContents.print(arg);
});

