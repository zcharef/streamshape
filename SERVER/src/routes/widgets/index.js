import { Router } from "express";
import axios from "axios";
import getJWT from "../../connection/apiRestConnection.js";

const widgetRouter = Router({ mergeParams: true });

widgetRouter.use("/gift", (req, res) => {
  getJWT()
    .then((token) => {
      axios
        .get(
          `http://${process.env.API_REST_URI}/user/${req.params.user_id}/config`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((rest_res) => {
          if (typeof rest_res.data == "undefined" || rest_res.data == "")
            res.status(404).send("404");
          res.render("gift_widget_template", {
            tiktok_username: rest_res.data.tiktokUsername,
            alert_duration: rest_res.data.giftWidget.alert_duration,
            alert_sound: rest_res.data.giftWidget.alert_sound,
            alert_img_src: rest_res.data.giftWidget.alert_img_src,
            alert_img_height: rest_res.data.giftWidget.alert_img_height,
            sent_sentence: rest_res.data.giftWidget.sent_sentence,
            name_color: rest_res.data.giftWidget.name_color,
            count_color: rest_res.data.giftWidget.count_color,
            icon_height: rest_res.data.giftWidget.icon_height,
            author_color: rest_res.data.giftWidget.author_color,
          });
        })
        .catch(() => {
          res.status(500).send("500");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("500");
    });
});

widgetRouter.use("/subscribe", (req, res) => {
  getJWT()
    .then((token) => {
      axios
        .get(
          `http://${process.env.API_REST_URI}/user/${req.params.user_id}/config`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((rest_res) => {
          if (typeof rest_res.data == "undefined" || rest_res.data == "")
            res.status(404).send("404");
          res.render("subscribe_widget_template", {
            tiktok_username: rest_res.data.tiktokUsername,
            alert_duration: rest_res.data.subscribeWidget.alert_duration,
            alert_sound: rest_res.data.subscribeWidget.alert_sound,
            alert_img_src: rest_res.data.subscribeWidget.alert_img_src,
            alert_img_height: rest_res.data.subscribeWidget.alert_img_height,
            sent_sentence: rest_res.data.subscribeWidget.sent_sentence,
            name_color: rest_res.data.subscribeWidget.name_color,
            count_color: rest_res.data.subscribeWidget.count_color,
            icon_height: rest_res.data.subscribeWidget.icon_height,
            author_color: rest_res.data.subscribeWidget.author_color,
          });
        })
        .catch(() => {
          res.status(500).send("500");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("500");
    });
});

widgetRouter.use("/follow", (req, res) => {
  getJWT()
    .then((token) => {
      axios
        .get(
          `http://${process.env.API_REST_URI}/user/${req.params.user_id}/config`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((rest_res) => {
          if (typeof rest_res.data == "undefined" || rest_res.data == "")
            res.status(404).send("404");
          res.render("follow_widget_template", {
            tiktok_username: rest_res.data.tiktokUsername,
            alert_duration: rest_res.data.followWidget.alert_duration,
            alert_sound: rest_res.data.followWidget.alert_sound,
            alert_img_src: rest_res.data.followWidget.alert_img_src,
            alert_img_height: rest_res.data.followWidget.alert_img_height,
            sent_sentence: rest_res.data.followWidget.sent_sentence,
            sent_sentence_color: rest_res.data.followWidget.sent_sentence_color,
            author_color: rest_res.data.followWidget.author_color,
          });
        })
        .catch(() => {
          res.status(500).send("500");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("500");
    });
});

widgetRouter.use("/like", (req, res) => {
  getJWT()
    .then((token) => {
      axios
        .get(
          `http://${process.env.API_REST_URI}/user/${req.params.user_id}/config`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((rest_res) => {
          if (typeof rest_res.data == "undefined" || rest_res.data == "")
            res.status(404).send("404");
          res.render("like_widget_template", {
            tiktok_username: rest_res.data.tiktokUsername,
            alert_duration: rest_res.data.likeWidget.alert_duration,
            alert_img_src: rest_res.data.likeWidget.alert_img_src,
            alert_img_height: rest_res.data.likeWidget.alert_img_height,
            author_color: rest_res.data.likeWidget.author_color,
          });
        })
        .catch(() => {
          res.status(500).send("500");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("500");
    });
});

widgetRouter.use("/chat", (req, res) => {
  getJWT()
    .then((token) => {
      axios
        .get(
          `http://${process.env.API_REST_URI}/user/${req.params.user_id}/config`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((rest_res) => {
          if (typeof rest_res.data == "undefined" || rest_res.data == "")
            res.status(404).send("404");
          res.render("chat_widget_template", {
            tiktok_username: rest_res.data.tiktokUsername,
            delay: rest_res.data.chatWidget.alert_duration,
          });
        })
        .catch(() => {
          res.status(500).send("500");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("500");
    });
});

widgetRouter.use("/goal/:goal_event", (req, res) => {
  getJWT()
    .then((token) => {
      axios
        .get(
          `http://${process.env.API_REST_URI}/user/${req.params.user_id}/config`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((rest_res) => {
          if (typeof rest_res.data == "undefined" || rest_res.data == "")
            res.status(404).send("404");
          res.render("goal_widget_template", {
            tiktok_username: rest_res.data.tiktokUsername,
            goal_event: req.params.goal_event,
            goal_current_value:
              rest_res.data.goalWidget[req.params.goal_event].current_value,
            goal_target_value:
              rest_res.data.goalWidget[req.params.goal_event].target_value,
            sentence: rest_res.data.goalWidget[req.params.goal_event].sentence,
            gradient_start:
              rest_res.data.goalWidget[req.params.goal_event].gradient_start,
            gradient_end:
              rest_res.data.goalWidget[req.params.goal_event].gradient_end,
            text_color:
              rest_res.data.goalWidget[req.params.goal_event].text_color,
            emote_img_src:
              rest_res.data.goalWidget[req.params.goal_event].emote_img_src,
            emote_img_height:
              rest_res.data.goalWidget[req.params.goal_event].emote_img_height,
          });
        })
        .catch(() => {
          res.status(500).send("500");
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("500");
    });
});

export default widgetRouter;
