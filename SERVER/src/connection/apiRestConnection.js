import axios from "axios";

let authJWT = undefined;

function getNewJWT() {
  return new Promise((resolve, reject) => {
    const data = {
      grant_type: "client_credentials",
      audience: "https://streamshape.eu.auth0.com/api/v2/",
      client_id: process.env.AUTH_CLIENT_ID,
      client_secret: process.env.AUTH_CLIENT_SECRET,
    };
    axios
      .post(process.env.AUTH_URL, data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        authJWT = res.data.access_token;
        resolve(authJWT);
        console.log(authJWT);
      })
      .catch((err) => reject(err));
  });
}
function getJWT() {
  return new Promise((resolve, reject) => {
    if (typeof authJWT !== "undefined") {
      resolve(authJWT);
    } else {
      getNewJWT()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

export default getJWT;
