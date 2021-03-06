const MainWindow = require('./electron/MainWindow')
const { Menu, app, BrowserWindow, shell } = require('electron')
const defaultMenu = require('electron-default-menu')
// require('electron-reload')(__dirname);
let mainWindow
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(function (){
  mainWindow = new MainWindow();
  mainWindow.loadView();

  /*
  const menu = defaultMenu(app, shell)
  // Add custom menu
  menu.splice(4, 0, {
    label: 'Navigation',
    submenu: [
      {
        label: 'Go Back',
        click: (item, focusedWindow) => {
          mainWindow.goBack()
        }
      }
    ]
  })

  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))

   */
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = new MainWindow();
    mainWindow.loadView()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
