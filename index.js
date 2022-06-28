const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

var selectedCharacter = {}
var win


const createWindow = () => {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('html/mainMenu.html')
}

app.whenReady().then(() => {
  ipcMain.on("loadCharacter", (e, character) => {
    console.log(`loading ${character}`)
    fs.readFile(`saves/${character}`, (err, data) => {
      if (err) {
        console.log("Save does not exist")
        win.loadFile("html/mainMenu.html")
      }
      else {
        selectedCharacter = JSON.parse(data)
        //win.loadFile("html/gameLobby.html")
      }

    })

  })

  ipcMain.handle("getSaves", () => {
    return fs.promises.readdir('saves/')
  })

  ipcMain.handle("readCharacter", () => {
    if (selectedCharacter && Object.keys(selectedCharacter).length > 0) {
      return selectedCharacter
    }
    else {
      win.loadFile("html/mainMenu.html")
      return
    }
    
  })

  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})



