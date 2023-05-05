import { log } from "../../../utils/utils.js";

function handleSocial(mqttConnectionChannel, _data) {
  if (process.env.FOLLOW_WIDGET === "1") {
    log("[📍 FOLLOW]: user `" + _data.uniqueId + "`");
    mqttConnectionChannel.publish(
      "amq.topic",
      `#${process.env.RABBITMQ_EVENTS_QUEUE}`,
      Buffer.from(
        JSON.stringify({
          tiktok_username: process.env.TIKTOK_USERNAME,
          event: "follow",
          data: _data,
        })
      )
    );
  }

  if (process.env.SHARE_WIDGET === "1") {
    log("[⛓  SHARE]: user `" + _data.uniqueId + "`");
    mqttConnectionChannel.publish(
      "amq.topic",
      `#${process.env.RABBITMQ_EVENTS_QUEUE}`,
      Buffer.from(
        JSON.stringify({
          tiktok_username: process.env.TIKTOK_USERNAME,
          event: "share",
          data: _data,
        })
      )
    );
  }
}

export default handleSocial;
