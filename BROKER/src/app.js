import "dotenv/config";
import startMqttConnection from "./connection/mqttConnection.js";
import startTikTokConnection from "./connection/tikTokConnection.js";
import startTikTokEventHandler from "./connection/handlers/eventHandler.js";
import State from "./connection/state.js";
import { log } from "./utils/utils.js";

let mqttConnectionChannel = undefined;

startMqttConnection()
  .then((_mqttConnection) => (mqttConnectionChannel = _mqttConnection))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

let init = () => {
  startTikTokConnection()
    .then((tiktokConnection) => {
      startTikTokEventHandler(mqttConnectionChannel, tiktokConnection);
    })
    .catch((err) => {
      State.setDisconnected();
      log("[❌]: " + err);
      console.error(err);
    });
};

init();

// If livestream is not online when the app starts, keep trying to connect.
setInterval(async () => {
  if (!State.isConnected()) {
    init();
  }
}, 10000);
