const {app, BrowserWindow} = require("electron");

function start() {

    const window = new BrowserWindow({
        width: 500,
        height: 500
    });

    window.loadFile("index.html");

    if (!app.isPackaged) {

    window.webContents.openDevTools();

    }
    
        
}


app.on("ready", () => start());

app.setName("app");