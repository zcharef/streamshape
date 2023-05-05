import amqplib from "amqplib";

export default function startMqttConnection() {
  return new Promise(async (resolve, reject) => {
    const mqtt_conn = await amqplib
      .connect(`${process.env.RABBITMQ_CONNECTION_STRING}?heartbeat=60`)
      .catch((err) => reject(err));

    await mqtt_conn
      .createConfirmChannel()
      .then((_mqtt_channel) => resolve(_mqtt_channel))
      .catch((err) => reject(err));
  });
}
