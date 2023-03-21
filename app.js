const {app, BrowserWindow, systemPreferences} = require("electron");

function start() {

    const window = new BrowserWindow({
        width: 500,
        height: 500,
        webPreferences: {
            devTools: app.isPackaged ? false : true
        }
    });

    window.loadFile("./publuc/index.html");

    if (!app.isPackaged) {

    window.webContents.openDevTools();

    }

    window.webContents.on("devtools-opened", () => {
        if (app.isPackaged) {
            //window.webContents.closeDevTools();
        }
    })
    
        
}


app.on("ready", async () => {
    
    let result = await systemPreferences.askForMediaAccess("camera");

    while (!result) {
        result = await systemPreferences.askForMediaAccess("camera");
    }


    start();
});


app.setName("入室管理アプリ");
