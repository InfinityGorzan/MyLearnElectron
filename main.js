const { app, BrowserWindow, ipcMain, nativeTheme, Menu, MenuItem } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#333',
      symbolColor: '#ddd',
      height: 30
    }
  })

  win.loadFile('index.html')
}

ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})


const menu = new Menu()
menu.append(new MenuItem({
  label: 'Toggle Mode',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Cmd+Alt+T' : 'Ctrl+Alt+T',
    click: () => { 
      if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = 'light'
      } else {
        nativeTheme.themeSource = 'dark'
      }
    }
  }]
}))

menu.append(new MenuItem({
  label: 'Reset Mode',
  submenu: [{
    role: 'help',
    accelerator: process.platform === 'darwin' ? 'Cmd+Alt+R' : 'Ctrl+Alt+R',
    click: () => { 
      nativeTheme.themeSource = 'system'
    }
  }]
}))

Menu.setApplicationMenu(menu)

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})