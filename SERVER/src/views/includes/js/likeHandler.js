import { io } from "https://cdn.socket.io/4.5.1/socket.io.esm.min.js";
import QueueManager from "../../../../static/js/queueManager.js";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function LikeHandler(tiktok_username, alert_duration) {
  const socket = io();

  let alertbox = document.getElementById("alertbox");
  let event_author = document.getElementById("author");

  let q = new QueueManager();

  socket.emit("create", tiktok_username);

  console.log(
    `SocketIO waiting for like events from user ${tiktok_username}...`
  );

  socket.on("like", (data) => {
    q.addToQueue(data.data);
  });

  alertbox.classList.add("hide");

  setInterval(() => {
    let next = q.getNext();
    if (typeof next != "undefined") {
      alertbox.classList.remove("hide");
      alertbox.classList.add("fade-in-fwd");
      event_author.textContent = next.nickname;
      delay(alert_duration).then(() => {
        alertbox.classList.add("fade-in-fwd");
        alertbox.classList.add("hide");
      });
    }
  }, alert_duration + 500);
}

export default LikeHandler;
