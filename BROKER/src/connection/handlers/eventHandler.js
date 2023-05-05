// import handleChat from "./events/chat.js";
import handleChat from "./events/chat.js";
import handleConnected from "./events/connected.js";
import handleDisconnected from "./events/disconnected.js";
import handleError from "./events/error.js";
import handleGift from "./events/gift.js";
import handleLike from "./events/like.js";
import handleRoomUser from "./events/roomUser.js";
import handleSocial from "./events/social.js";
import handleStreamEnd from "./events/streamEnd.js";
import handleSubscribe from "./events/subscribe.js";

export default async function StartTikTokEventHandler(
  mqttConnectionChannel,
  tiktokConnection
) {
  tiktokConnection.on("error", (err) =>
    handleError(mqttConnectionChannel, err)
  );

  tiktokConnection.on("connected", () =>
    handleConnected(mqttConnectionChannel)
  );

  tiktokConnection.on("disconnected", () =>
    handleDisconnected(mqttConnectionChannel)
  );

  tiktokConnection.on("streamEnd", () =>
    handleStreamEnd(mqttConnectionChannel)
  );

  tiktokConnection.on("gift", (data) =>
    handleGift(mqttConnectionChannel, data)
  );

  tiktokConnection.on("subscribe", (data) =>
    handleSubscribe(mqttConnectionChannel, data)
  );

  tiktokConnection.on("chat", (data) =>
    handleChat(mqttConnectionChannel, data)
  );

  tiktokConnection.on("social", (data) =>
    handleSocial(mqttConnectionChannel, data)
  );

  tiktokConnection.on("like", (data) =>
    handleLike(mqttConnectionChannel, data)
  );

  tiktokConnection.on("roomUser", (data) =>
    handleRoomUser(mqttConnectionChannel, data)
  );
}
