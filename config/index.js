const fs = require("fs");
const path = require("path");
const constants = require("../constants");
let _config = null;
let configBuffer = null;

exports.createConfig = (callback) => {
  const NODE_ENV = process.env.NODE_ENV;
  configBuffer = fs.readFileSync(
    path.resolve(__dirname, "data", "config.json"),
    "utf-8"
  );
  if (!configBuffer) {
    console.log(constants.FILE404);
    process.exit(1);
  } else {
    _config = JSON.parse(configBuffer);
    global.gConfig = _config;
    callback(null);
  }
};
