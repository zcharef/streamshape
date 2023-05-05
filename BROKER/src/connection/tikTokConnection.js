import { WebcastPushConnection } from "tiktok-live-connector";
import State from "./state.js";
import { log } from "../utils/utils.js";

function initTikTokConnection() {
  return new WebcastPushConnection(process.env.TIKTOK_USERNAME, {
    requestHeaders: {
      "Cookie": "sessionid=4f7ab0bf08346184a52523a5f36922a2; ttwid=1%7CnYrD56VQNNFQXwBOTmCeC--zDFHboHa814WU0CW6j9U%7C1658408688%7C7bd612991c436fd47c71af60158d11188534544161eefad51ad587d4d9220fcd;",
    },
    websocketHeaders: {
      "Cookie": "sessionid=4f7ab0bf08346184a52523a5f36922a2; ttwid=1%7CnYrD56VQNNFQXwBOTmCeC--zDFHboHa814WU0CW6j9U%7C1658408688%7C7bd612991c436fd47c71af60158d11188534544161eefad51ad587d4d9220fcd;",
    },
    processInitialData: false,
    enableWebsocketUpgrade: true,
    clientParams: {
      app_language: process.env.CLIENT_LOCALE,
      device_platform: "web",
    },
  });
}

export default function StartTikTokConnection() {
  return new Promise(function (resolve, reject) {
    let connection = initTikTokConnection();
    connection
      .connect()
      .then((state) => {
        log(
          `[✅]: Connected to user '${process.env.TIKTOK_USERNAME}' / roomId ${state.roomId} !`
        );
        connection
          .getRoomInfo()
          .then((roomInfo) => {
            log(`[✅]: Stream started timestamp: ${roomInfo.create_time}`);
            log(`[✅]: Streamer bio: ${roomInfo.owner.bio_description}`);
          })
          .catch((err) => {
            console.error(err);
          });
        State.setConnected();
        resolve(connection);
      })
      .catch((err) => {
        State.setDisconnected();
        reject(err);
      });
  });
}
