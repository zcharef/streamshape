import amqplib from "amqplib";
import { Server } from "socket.io";
import eventHandler from "../handlers/eventHandler.js";

export default async function startMqttConnection(io) {
  await amqplib
    .connect(`${process.env.RABBITMQ_CONNECTION_STRING}?heartbeat=60`)
    .then(async (mqtt_conn) => {
      await mqtt_conn
        .createConfirmChannel()
        .then(async (mqtt_channel) => {
          await mqtt_channel
            .assertQueue(process.env.RABBITMQ_EVENTS_QUEUE, {
              durable: true,
            })
            .then(() => {
              mqtt_channel
                .consume(process.env.RABBITMQ_EVENTS_QUEUE, (msg) =>
                  eventHandler(io, mqtt_channel, msg)
                )
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}
