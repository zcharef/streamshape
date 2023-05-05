import { Router } from "express";
import widgetRouter from "./widgets/index.js";

const router = Router();

router.use("/widgets/:user_id", widgetRouter);

export default router;
