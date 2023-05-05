import { getUserIdFromRequest } from "../../utils/auth0Utils.js";

export function requireUserContext(req, res, next) {
    if (!getUserIdFromRequest(req)) {
        res.status(403).json({ errorMessage: "missing or invalid auth cookie provided" });
        return
    }

    next();
}