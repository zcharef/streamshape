import parseJwt from "./jwtParser.js";

function getKeycloakId(req) {
  return new Promise((resolve, reject) => {
    parseJwt(req.rawHeaders[1])
      .sub.then((id) => {
        if (!id) reject(undefined);
        resolve(id);
      })
      .catch(() => {
        reject(undefined);
      });
  });
}

function isOwner(req) {
  return new Promise((resolve, reject) => {
    //add admin access to all
    getKeycloakId()
      .then((owner) => {
        const from = req.params.user_id;
        if (from !== owner) reject(false);
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}

export { isOwner, getKeycloakId };
