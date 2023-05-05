import State from "../../../connection/state.js";
import { log } from "../../../utils/utils.js";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function handleDisconnected(mqttConnectionChannel) {
  State.setDisconnected();
  log("[❌]: Disconnected");
  mqttConnectionChannel.publish(
    "amq.topic",
    `#${process.env.RABBITMQ_EVENTS_QUEUE}`,
    Buffer.from(
      JSON.stringify({
        tiktok_username: process.env.TIKTOK_USERNAME,
        event: "disconnected",
        data: new Date().toLocaleTimeString(),
      })
    )
  );
  await delay(10000);
}

export default handleDisconnected;
