import { log } from "../../../utils/utils.js";

let previous_id = "";

function handleLike(mqttConnectionChannel, _data) {
  if (process.env.LIKE_WIDGET === "1") {
    log("[❤️ LIKE]: user `" + _data.uniqueId + "`");
    if (previous_id === _data.uniqueId) return;
    mqttConnectionChannel.publish(
      "amq.topic",
      `#${process.env.RABBITMQ_EVENTS_QUEUE}`,
      Buffer.from(
        JSON.stringify({
          tiktok_username: process.env.TIKTOK_USERNAME,
          event: "like",
          data: _data,
        })
      )
    );
    previous_id = _data.uniqueId;
  }
}

export default handleLike;
