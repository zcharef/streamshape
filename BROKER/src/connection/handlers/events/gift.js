import { log } from "../../../utils/utils.js";

function handleGift(mqttConnectionChannel, _data) {
  if (process.env.GIFT_WIDGET === "0") return;
  if (_data.giftType === 1 && !_data.repeatEnd) {
    // Streak in progress => show only temporary
    // a console.log(`${_data.uniqueId} is sending gift ${_data.giftName} x${_data.repeatCount}`);
  } else {
    // Ignoring the event if the gift value is under the limit
    // let value = parseInt(_data.diamondCount) * parseInt(_data.repeatCount);
    // if (value < parseInt(_config.alerts.gifts.options.minimum_diamonds_value))
    //   return;

    // Streak ended or non-streakable gift => process the gift with final repeat_count
    mqttConnectionChannel.publish(
      "amq.topic",
      `#${process.env.RABBITMQ_EVENTS_QUEUE}`,
      Buffer.from(
        JSON.stringify({
          tiktok_username: process.env.TIKTOK_USERNAME,
          event: "gift",
          data: _data,
        })
      )
    );
    log(
      "[🎁 GIFT]: user `" +
        _data.uniqueId +
        " : `x" +
        _data.repeatCount +
        " `" +
        _data.giftName +
        "`"
    );
  }
}

export default handleGift;
