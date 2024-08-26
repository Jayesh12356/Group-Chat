const configFile = require("../config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const apm = require("elastic-apm-node");
const bodyParser = require("body-parser");
SequelizeConn = require("../src/connections/database");

let config = null;

exports.initialize = (app, callback) => {
  configFile.createConfig((err) => {
    if (err) {
      callback(err);
    } else {
      config = Object.assign({}, global.gConfig);

      const sequelizeObj = new SequelizeConn();
      const sequelizeConnResult = sequelizeObj.connectDB();
      if (!sequelizeConnResult) {
        console.log(err);
        process.exit(1);
      }

      app.use(bodyParser.json({ limit: "50mb" }));
      app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

      app.use(apm.middleware.connect());
      app.use(cookieParser(""));

      app.use((req, res, next) => {
        req.response = {};
        next();
      });
      app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        if (req.method === "OPTIONS") {
          return res.status(200).end();
        } else {
          next();
        }
      });
      callback(null);
    }
  });
};
