import prisma from "../../prismaClient.js";

export function requireAdminPermission(req, res, next) {

    // Admins need a @streamshape.net email
    if (!req.oidc.isAuthenticated() || !req.oidc.user.email.endsWith('@streamshape.net')) {
        res.status(403).json({ errorMessage: "User not authorized in admin API" });
        return;
    }

    // Check if email is confirmed and admin permission exists on user record
    prisma.user.findFirst({
        where: {
            email: req.oidc.user.email,
            email_verified: true
        }
    }).then(user => {
        if (!user) {
            res.status(403).json({ errorMessage: "User not authorized in admin API (missing email verification)" });
            return;
        }

        if (!user.permissions || !user.permissions.admin) {
            res.status(403).json({ errorMessage: "User not authorized in admin API (missing admin permission)" });
            return;
        }

        next();
    }).catch(err => {
        res.status(500).json({ errorMessage: "Failed to retrieve user record" });
    })
}