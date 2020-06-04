const { BrowserWindow, BrowserView } = require('electron')

class MainWindow {
  constructor () {
    this.win = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true
      },
    })
  }

  loadView () {
    // and load the index.html of the app.
    this.win.loadFile(__dirname + '/../view/page.html')
    this.win.maximize()
    //this.lfsView.webContents.loadFile(__dirname + '/../view/page.html')
    //this.termView.webContents.loadFile(__dirname + '/../view/index.html')
    // Open the DevTools.
    this.win.webContents.openDevTools({mode:'detach'})
  }
}

module.exports = MainWindow
