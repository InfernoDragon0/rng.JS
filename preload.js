const { contextBridge, ipcRenderer } = require('electron')
const fs = require('fs')

var tests = "one"

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })

contextBridge.exposeInMainWorld("testAPI", {
    'saveCharacterData': (playerName, playerData, overwrite = "wx") => { 
      var file = fs.writeFile(`saves/${playerName}.json`, JSON.stringify(playerData, null, 2), {flag: overwrite}, (err) => {
        if (err) {
          console.log("error writing to file: " + err)
        }
        else { //RACE CONDITIONS
          ipcRenderer.send('loadCharacter', `${playerName}.json`)
        }
      })
    },
    'loadCharacter': (character) => { 
      ipcRenderer.send('loadCharacter', character)
    },
    'getSaves': () => { 
      return ipcRenderer.invoke('getSaves')
    },
    'readCharacter': () => { //for loaded character 
      return ipcRenderer.invoke('readCharacter')
    },

})