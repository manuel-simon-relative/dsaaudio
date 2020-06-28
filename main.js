const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const devmode = true;

let win;

function createWindow() {
  if (!devmode) {win = new BrowserWindow({ width: 1000, height: 850 })};
  if (devmode) {win = new BrowserWindow({ width: 1300, heigth: 850 })};

  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // The following is optional and will open the DevTools:
    if (devmode) {win.webContents.openDevTools()}

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});