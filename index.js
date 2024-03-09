const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();

const server = app.listen(3000, function () {
  console.log("Ready on port %d", server.address().port);
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//require routes
var CheckAPI = require("./routers/CheckApi");
var Register = require("./routers/Register");
var UploadFiles = require("./routers/UploadFiles");
var Login = require("./routers/Login");
var EditData = require("./routers/EditData");
var DeleteData = require("./routers/DeleteData");
var GetData = require("./routers/GetData");
var Borrowing = require("./routers/Borrowing");
var Reverting = require("./routers/Reverting");
var Notification = require("./routers/Notification");
var SetData = require("./routers/SetData");
var Backup = require("./routers/Backup");

//use routes
app.use("/", CheckAPI);
app.use("/Register", Register);
app.use("/UploadFiles", UploadFiles);
app.use("/Login", Login);
app.use("/EditData", EditData);
app.use("/DeleteData", DeleteData);
app.use("/GetData", GetData);
app.use("/Borrowing", Borrowing);
app.use("/Reverting", Reverting);
app.use("/SetData", SetData);
app.use("/Backup", Backup);

app.use(express.static("uploads")); //สำหรับโชว์รูปภาพใน service

const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", function (client) {
  console.log("Client connected..");
  // client.on("join", function (data) {
  //   console.log(data);
  // });
  setInterval(async function () {
    let dataSend = await Notification.sendNoti();
    if (dataSend.length > 0) {
      io.sockets.emit("dataNoti", dataSend);
    }
  }, 1000 * 10);
});
