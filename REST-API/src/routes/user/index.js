import { Router } from "express";
import configRouter from "./config/index.js";
import prisma from "../../prismaClient.js";
import { auth } from "express-oauth2-jwt-bearer";
import { requireUserContext } from "./middleware.js";

const userRouter = Router({ mergeParams: true });

// GET /user/config
userRouter.use("/config", configRouter);

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: "QJ7fM5foh4YW1ZyxIdON8SFy8K6RznkO",
  issuerBaseURL: `localhost`,
});

// function isInternalRequest(req) {
//   // Needs improvement (if request is from anyhing else than our api then reject)
//   return new Promise((resolve, reject) => {
//     if (req.rawHeaders[9] !== process.env.API_URI) {
//       reject(false);
//     }
//     resolve(true);
//   });
// }

// GET /user
userRouter.get("/", (req, res) => {
  isInternalRequest(req)
    .then(() => {
      prisma.user
        .findMany()
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json(err);
        });
    })
    .catch(() => {
      res.status(500).json("You're not allowed to access this API.");
      res.end();
      return;
    });
});

// GET /user/:user_id
userRouter.get("/:user_id", (req, res) => {
  //   isOwner(req)
  //     .then(() => {
  //       prisma.user
  //         .findUnique({
  //           where: {
  //             id: req.params.user_id,
  //           },
  //         })
  //         .then((data) => {
  //           res.status(200).json(data);
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //           res.status(500).json(err);
  //         });
  //     })
  //     .catch(() => {
  //       res.status(500).json("You're not allowed to do this.");
  //     });
});

// POST /user
userRouter.post("/", (req, res) => {
  //   getKeycloakId(req)
  //     .then((id) => {
  //       prisma.user
  //         .create({
  //           data: {
  //             keycloakId: id,
  //           },
  //         })
  //         .then((data) => {
  //           res.status(200).json(data);
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //           res.status(500).json("Internal server error.");
  //         });
  //     })
  //     .catch(() => {
  //       res.status(500).json("No keycloak sub found");
  //     });
});

// PUT /user
userRouter.put("/", (req, res) => {
  res.status(200).json("ok /user");
});

// DELETE /user
userRouter.delete("/", (req, res) => {
  res.status(200).json("ok /user");
});

userRouter.get("/:userId/config", (req, res) => {
  prisma.config
    .findUnique({
      where: {
        userId: req.params.userId,
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

export default userRouter;
