import { io } from "https://cdn.socket.io/4.5.1/socket.io.esm.min.js";
import Confettiful from "../../../../static/js/confettiful.js";

function GoalHandler(
  tiktok_username,
  goal_event,
  goal_current_value,
  goal_target_value
) {
  const socket = io();
  let container = document.querySelector(".container");
  let fill = document.querySelector(".fill");
  let output = document.querySelector(".output");

  let previous_likes = { count: 0, locked: false };
  let a = goal_current_value;
  let b = 0;
  let potb = 0;
  let followers_list = [];
  socket.emit("create", tiktok_username);

  console.log(
    `SocketIO waiting for ${goal_event} events from user ${tiktok_username}...`
  );

  //   document.getElementById("test").onclick = function changeContent() {
  //     b = 300;

  //     a += 30;
  //     potb += (100 / parseInt(b)) * parseInt(30);
  //     if (a == b) {
  //       output.style.display = "flex";
  //       container.style.display = "none";
  //       window.confettiful = new Confettiful(document.querySelector(".output"));
  //     } else {
  //       var counter = document.querySelector(".counter");
  //       counter.textContent = a + "/" + b;
  //       fill.style.width = potb + "%";
  //     }
  //   };
  socket.on(goal_event, async (data) => {
    data = data.data;
    b = goal_target_value;
    if (goal_event === "like") {
      if (!previous_likes.locked) {
        previous_likes.count = data.totalLikeCount;
        previous_likes.locked = true;
      } else {
        let to_add =
          parseInt(data.totalLikeCount) - parseInt(previous_likes.count);
        a += to_add;
        previous_likes.count = data.totalLikeCount;
        potb += (100 / parseInt(b)) * to_add;
      }
    } else if (goal_event === "follow") {
      if (!followers_list.includes(data.uniqueId)) {
        a += 1;
        potb += 100 / parseInt(b);
      }
    } else {
      a += 1;
      potb += 100 / parseInt(b);
    }
    if (a == b) {
      output.style.display = "flex";
      container.style.display = "none";
      window.confettiful = new Confettiful(document.querySelector(".output"));
    } else {
      var counter = document.querySelector(".counter");
      counter.textContent = a + "/" + b;
      fill.style.width = potb + "%";
    }
  });
}

export default GoalHandler;
