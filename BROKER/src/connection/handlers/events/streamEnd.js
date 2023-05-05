import State from "../../../connection/state.js";
import { log } from "../../../utils/utils.js";

function handleStreamEnd(mqttConnectionChannel) {
  State.setDisconnected();
  log("[❌]: The stream has ended.");
  mqttConnectionChannel.publish(
    "amq.topic",
    `#${process.env.RABBITMQ_EVENTS_QUEUE}`,
    Buffer.from(
      JSON.stringify({
        tiktok_username: process.env.TIKTOK_USERNAME,
        event: "streamEnd",
        data: new Date().toLocaleTimeString(),
      })
    )
  );
}

export default handleStreamEnd;
