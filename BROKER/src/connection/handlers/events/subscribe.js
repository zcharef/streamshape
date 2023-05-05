import { log } from "../../../utils/utils.js";

function handleSubscribe(mqttConnectionChannel, _data) {
  if (process.env.SUBSCRIBE_WIDGET === "0") return;

  mqttConnectionChannel.publish(
    "amq.topic",
    `#${process.env.RABBITMQ_EVENTS_QUEUE}`,
    Buffer.from(
      JSON.stringify({
        tiktok_username: process.env.TIKTOK_USERNAME,
        event: "subscribe",
        data: _data,
      })
    )
  );
  log("[🎁 SUBSCRIBE]: user `" + _data.uniqueId + "`");
}

export default handleSubscribe;
