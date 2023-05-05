import fs from "fs";

function log(msg) {
  console.log("[" + new Date().toLocaleTimeString() + "]" + msg);
}

function readJSON(path) {
  let data = fs.readFileSync(path, "utf8");
  return JSON.parse(data);
}
export { readJSON, log };
