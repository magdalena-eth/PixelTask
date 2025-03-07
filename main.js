const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 350,
        height: 270,
        webPreferences: {
            nodeIntegration: true, // Ermöglicht den Zugriff auf node.js-Module im Renderer-Prozess
            contextIsolation: false // Dadurch kann der Renderer auf die Node.js-API zugreifen
        }
    });

    // Lade die HTML-Datei, die dein Frontend enthält
    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
