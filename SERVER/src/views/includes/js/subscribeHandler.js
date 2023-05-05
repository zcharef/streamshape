import { io } from "https://cdn.socket.io/4.5.1/socket.io.esm.min.js";
import QueueManager from "../../../../static/js/queueManager.js";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function SubscribeHandler(tiktok_username, alert_duration, alert_sound) {
  const socket = io();

  let alertbox = document.getElementById("alertbox");
  let event_author = document.getElementById("author");
  let q = new QueueManager();
  let audio = new Audio(alert_sound);

  socket.emit("create", tiktok_username);

  console.log(
    `SocketIO waiting for subscribe events from user ${tiktok_username}...`
  );

  socket.on("subscribe", async (data) => {
    data = data.data;
    q.addToQueue(data);
  });

  alertbox.classList.add("hide");

  setInterval(async () => {
    let next = q.getNext();
    if (typeof next != "undefined") {
      alertbox.classList.remove("hide");
      if (typeof audio !== "undefined" && audio !== undefined) {
        audio.play();
      }
      alertbox.classList.add("fade-in-fwd");
      event_author.textContent = next.nickname;
      delay(alert_duration).then(() => {
        alertbox.classList.add("hide");
        alertbox.classList.add("fade-in-fwd");
        if (typeof audio !== "undefined" && audio !== undefined) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    }
  }, alert_duration + 500);
}

export default SubscribeHandler;
