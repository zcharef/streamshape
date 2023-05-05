function eventHandler(io, mqtt_channel, msg) {
  if (msg !== null && typeof msg !== undefined && msg !== "undefined") {
    // if data.tiktok_username.persistent
    let data = JSON.parse(msg.content.toString());
    if (data === null && typeof data === undefined && data === "undefined")
      return;
    //   console.log("Received:", data);
    io.to(data.tiktok_username).emit(data.event, data);
    mqtt_channel.ack(msg);
  } else {
    console.log("Consumer cancelled by server");
  }
}
export default eventHandler;
