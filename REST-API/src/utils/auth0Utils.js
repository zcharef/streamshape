export function getUserIdFromRequest(req) {
    if (req.oidc.isAuthenticated()) {
        return req.oidc.user.sub.split('|')[1];
    }

    return null;
}