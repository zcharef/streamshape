import State from "../../../connection/state.js";
import { log } from "../../../utils/utils.js";

function handleConnected(mqttConnectionChannel, state) {
  State.setConnected();
  log("[✅]: Connected to TikTok !", state);
  mqttConnectionChannel.publish(
    "amq.topic",
    `#${process.env.RABBITMQ_EVENTS_QUEUE}`,
    Buffer.from(
      JSON.stringify({
        tiktok_username: process.env.TIKTOK_USERNAME,
        event: "connected",
        data: new Date().toLocaleTimeString(),
      })
    )
  );
}

export default handleConnected;
