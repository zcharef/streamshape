function handleError(mqttConnectionChannel, error) {
  //   mqttConnectionChannel.publish(
  //     "amq.topic",
  //     `#${process.env.RABBITMQ_EVENTS_QUEUE}`,
  //     Buffer.from(
  //       JSON.stringify({
  //         tiktok_username: process.env.TIKTOK_USERNAME,
  //         event: "error",
  //         data: error,
  //       })
  //     )
  //   );
  console.error("Error!", error);
}

export default handleError;
