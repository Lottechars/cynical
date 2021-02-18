(() => {
    
    const path = require('path');
    const url = require('url');

    const { app, BrowserWindow, Menu, ipcMain } = require('electron');
    require('electron-reload')(__dirname);

    const isDev = process.env.NODE_ENV === 'development';
    
    let mainWindow;

    app.on('ready', () => {
        mainWindow = new BrowserWindow(getOptionsForMainWindow());

        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '..', 'sources', 'views', 'index.html'),
            protocol: 'file:',
            slashes: true
          }));

        mainWindow.on('closed', () => {
            app.quit();
        });
    });

    function getOptionsForMainWindow() {
        const optionsMainWindow = {
            width: 1000,
            height: 600,
            frame: false,
            center: true, 
            resizable: false,
            movable: true,
            titleBarStyle: 'hidden',
            fullscreenWindowTitle: true,
            webPreferences: {
                devTools: false,
                nodeIntegration: false,
                preload: path.join(__dirname, 'preload.js')
            }
        };

        if(isDev) {
            optionsMainWindow.webPreferences.devTools = true;
        };

        return optionsMainWindow;
    }
})();
