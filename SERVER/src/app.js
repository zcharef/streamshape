import "dotenv/config";

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import startMqttConnection from "./connection/mqttConnection.js";
import pug from "pug";

import { log } from "./utils/utils.js";
import router from "./routes/index.js";

let port = process.env.APP_PORT;

const app = express();

app.set("views", "./src/views");
app.set("view engine", "pug");

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [process.env.APP_URI],
  },
});

if (port === undefined || port === "") {
  log("[❌]: The environment variable PORT is undefined.");
  process.exit(1);
}

try {
  httpServer.listen(port);
} catch {
  log("[❌]: The port " + port + " seems to be already used");
  process.exit(1);
} finally {
  log("[✅]: Server started on port " + port);
}

pug.compileFile("src/views/gift_widget_template.pug");
pug.compileFile("src/views/like_widget_template.pug");
pug.compileFile("src/views/follow_widget_template.pug");
pug.compileFile("src/views/chat_widget_template.pug");
pug.compileFile("src/views/goal_widget_template.pug");
pug.compileFile("src/views/subscribe_widget_template.pug");

startMqttConnection(io).catch((err) => {
  console.error(err);
  process.exit(1);
});

app.use("/", router);

app.use("/static", express.static("static"));

io.on("connection", (socket) => {
  console.log("New socket client connected");
  socket.on("create", function (room) {
    console.log(`Room ${room} created`);
    socket.join(room);
  });
});
// io.on("connect", function (socket) {
//   socket.join("some room");
//   console.log("New socket client connected");
// });
