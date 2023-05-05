import { log } from "../../../utils/utils.js";

function sendMessageFromQueue(
  tiktokConnection,
  messages_queue,
  last_message,
  last_message_timestamp
) {
  //if (Date.now() <= last_message_timestamp + 10000) return;
  const message = messages_queue.shift();
  if (
    undefined === message ||
    ("string" !== typeof message && "" === message.trim())
  )
    return;
  tiktokConnection
    .sendMessage("[BOT]: " + message)
    .then(() => log("[🤖]: " + "'" + message + "'" + " sent !"))
    .catch((err) => {
      //RESET SESSION ID
      // IF OK
      //ADD TO QUEUE
      // ELSE
      // DELAY AND RETRY
      log("[❌]: " + err);
    });

  last_message = message;
  last_message_timestamp = Date.now();
}

function handleQueues(
  tiktokConnection,
  messages_queue,
  last_message,
  last_message_timestamp
) {
  setInterval(() => {
    sendMessageFromQueue(
      tiktokConnection,
      messages_queue,
      last_message,
      last_message_timestamp
    );
  }, 10000);
}

export default handleQueues;
