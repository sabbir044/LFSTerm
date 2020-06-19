const { BrowserWindow, shell } = require('electron')

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

    /*
    this.win.webContents.on("did-navigate-in-page", function (e) {
      //TODO enable navigation in page
      console.log(e)
      console.log(this.getURL())
    })
     */
    const handleRedirect = (e, url) => {
      if(url !== this.win.webContents.getURL()) {
        e.preventDefault()
        shell.openExternal(url)
      }
    }

    this.win.webContents.on('will-navigate', handleRedirect)
    this.win.webContents.on('new-window', handleRedirect)
  }

  goBack () {
    console.log(this.win.webContents.get)
    this.win.webContents.goBack()
  }
}

module.exports = MainWindow
