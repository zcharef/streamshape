import { io } from "https://cdn.socket.io/4.5.1/socket.io.esm.min.js";
import QueueManager from "../../../../static/js/queueManager.js";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function GiftHandler(tiktok_username, alert_duration, alert_sound) {
  const socket = io();

  let alertbox = document.getElementById("alertbox");
  let event_author = document.getElementById("author");
  let event_count = document.getElementById("count");
  let event_name = document.getElementById("name");
  let event_icon = document.getElementById("icon");
  let q = new QueueManager();
  let audio = new Audio(alert_sound);


  socket.emit("create", tiktok_username);

  console.log(
    `SocketIO waiting for gift events from user ${tiktok_username}...`
  );

  socket.on("gift", async (data) => {
    data = data.data;
    q.addToQueue(data);
  });

  alertbox.classList.add("hide");

  setInterval(async () => {
    let next = q.getNext();
    if (typeof next != "undefined") {
      alertbox.classList.remove("hide");
      alertbox.classList.add("fade-in-fwd");
	  if (typeof audio !== "undefined" && audio !== undefined) {
        audio.play();
      }
      event_icon.src = next.giftPictureUrl;
      event_author.textContent = next.nickname;
      event_count.textContent = "x" + next.repeatCount;
      event_name.textContent = next.giftName + "(s)";
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

export default GiftHandler;
