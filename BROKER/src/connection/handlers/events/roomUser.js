import { log } from "../../../utils/utils.js";

let tmp = 0;

function handleRoomUser(mqttConnectionChannel, _data) {
  if (tmp === _data.viewerCount) return;
  log("[👥 VIEWERS]: " + _data.viewerCount);
  mqttConnectionChannel.publish(
    "amq.topic",
    `#${process.env.RABBITMQ_EVENTS_QUEUE}`,
    Buffer.from(
      JSON.stringify({
        tiktok_username: process.env.TIKTOK_USERNAME,
        event: "roomUser",
        data: _data,
      })
    )
  );
  tmp = _data.viewerCount;
}

export default handleRoomUser;
