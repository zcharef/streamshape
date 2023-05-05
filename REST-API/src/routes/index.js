import { Router } from "express";
import userRouter from "./user/index.js";
import adminRouter from "./admin/index.js";

const router = Router();

router.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? `Logged in as ${req.oidc.user.sub}` : "Logged out");
});

router.use("/user", userRouter);
router.use("/admin", adminRouter);

export default router;
