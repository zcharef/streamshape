import { Router } from "express";
import { requireAdminPermission } from "./middleware.js";
import prisma from "../../prismaClient.js";

const adminRouter = Router({ mergeParams: true });

adminRouter.use(requireAdminPermission);

adminRouter.get("/users", (req, res) => {
    prisma.user.findMany({
        select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            premium: true,
            createdAt: true
        }
    }).then(users => {
        res.json(users);
    });
});

adminRouter.get("/users/:userId", (req, res) => {
    prisma.user.findFirst({
        where: {
            id: req.params.userId
        }
    }).then(configs => {
        res.json(configs);
    });
});

adminRouter.get("/users/:userId/config", (req, res) => {
    prisma.config.findFirst({
        where: {
            userId: req.params.userId
        }
    }).then(config => {
        res.json(config);
    });
});

adminRouter.patch("/users/:userId/config", (req, res) => {
    prisma.config.update({
        where: {
            id: req.body.id,
        },
        data: req.body,
    }).then(() => {
        res.status(200).json(req.body);
    }).catch(err => {
        res.status(500).json({ errorMessage: "Failed to update config" });
    })
});

export default adminRouter;