const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// Getting app ready

app.on("ready", function () {
  //creating new windows
  mainWindow = new BrowserWindow({
    width: 970,
    height: 790,
  });
  //loading html
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true,
    })
  );
  //menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  //inserting menu

  Menu.setApplicationMenu(mainMenu);
});

//creating menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
      },
      {
        label: "Clear Items",
      },
      {
        label: "Quit",
        accelerator: (process.platform = "Ctrl+Q"),
        click() {
          app.quit();
        },
      },
    ],
  },
];
