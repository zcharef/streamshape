import "dotenv/config";
import express from "express";
import cors from "cors"
import memoryStore from "./memoryStore.js";
import bodyParser from"body-parser";

import router from "./routes/index.js";

import openid from "express-openid-connect";

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.APP_URI,
  clientID: "",
  issuerBaseURL: "",
};

var corsOptions = {
  origin: ['http://localhost:3000', 'https://*.services.streamshape.net', 'https://dashboard.streamshape.net'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(openid.auth(config));

// Allow JSON bodies (POST/PATCH/PUT)
app.use(bodyParser.json());

app.use(cors(corsOptions))

app.use("/", router);

// Serve admin dashboard
app.use(express.static('public', { extensions: ['html'] }));

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on ${process.env.APP_PORT}`);
});

export default app;