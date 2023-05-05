import { log } from "../../../utils/utils.js";

// function addMessageToQueue(
//   messages_queue,
//   command,
//   last_message,
//   last_message_timestamp
// ) {
//   if (
//     last_message == command[1].message &&
//     Date.now() <= last_message_timestamp + 20000
//   ) {
//     log("[🤖]: Ignored command `" + command[0] + "`");
//     return;
//   }
//   messages_queue.push(command[1].message);
// }

function viewerIsModerator(data) {
  if (data.some((badges) => badges.name === "Moderator")) return true;
  return false;
}

function handleChat(mqttConnectionChannel, _data) {
  if (process.env.CHAT_WIDGET === "0") return;
  mqttConnectionChannel.publish(
    "amq.topic",
    `#${process.env.RABBITMQ_EVENTS_QUEUE}`,
    Buffer.from(
      JSON.stringify({
        tiktok_username: process.env.TIKTOK_USERNAME,
        event: "chat",
        data: _data,
      })
    )
  );
  //   if (_config.commands.enabled) {
  //     if (data.comment[0] === "!") {
  //       log(
  //         "[🤖]: Command `" +
  //           data.comment +
  //           "` received from `" +
  //           data.uniqueId +
  //           "`"
  //       );
  //       commands.map((command) => {
  //         if (data.comment.toLowerCase() === command[0])
  //           if (command[1].moderatorsOnly) {
  //             if (viewerIsModerator(data)) {
  //               addMessageToQueue(
  //                 messages_queue,
  //                 command,
  //                 last_message,
  //                 last_message_timestamp
  //               );
  //               return;
  //             }
  //             return;
  //           } else {
  //             addMessageToQueue(
  //               messages_queue,
  //               command,
  //               last_message,
  //               last_message_timestamp
  //             );
  //             return;
  //           }
  //       });
  //     }
  //   }
}

export default handleChat;
