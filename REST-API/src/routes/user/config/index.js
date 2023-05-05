import { Router } from "express";
import { getUserIdFromRequest } from "../../../utils/auth0Utils.js";
import { requireUserContext } from "../middleware.js";
import prisma from "../../../prismaClient.js";

const configRouter = Router({ mergeParams: true });

configRouter.use(requireUserContext);

// GET /user/config
configRouter.get("/", (req, res) => {
  prisma.config
    .findUnique({
      where: {
        userId: getUserIdFromRequest(req),
      },
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      if (err.code === "P2023")
        console.log("Request for widget for unknown userId");
      else console.error(err);
      res.status(500).json(err);
    });
});


configRouter.patch("/:column", (req, res) => {

  // Prevent users from updating the userId column
  if (['id', 'userId'].includes(req.params.column)) {
    res.status(403).json({ errorMessage: "now allowed to update this column" });
    return;
  }

  // Load config from db
  prisma.config.findFirst({
    where: {
      userId: getUserIdFromRequest(req),
    }
  }).then((config) => {

    // Merge JSON configs or overwrite string values
    if (typeof config[req.params.column] === 'object') {
      config[req.params.column] = Object.assign(config[req.params.column], req.body);
    } else if (typeof req.body.newValue !== 'undefined') {
      config[req.params.column] = req.body.newValue;
    }

    prisma.config.update({
      where: {
        userId: getUserIdFromRequest(req),
      },
      data: config
    }).then(() => {
      res.status(200).json(config);
    }).catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
  }).catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
});

export default configRouter;
