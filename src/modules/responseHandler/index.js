const constants = require("../../../constants");
module.exports = (req, res, next) => {
  const code = typeof req.response === "undefined" ? 200 : req.response.code;
  const message =
    typeof req.response === "undefined" ? "" : req.response.message;
  const data = typeof req.response === "undefined" ? {} : req.response.data;
  const success =
    typeof req.response === "undefined" ||
    typeof req.response.success === "undefined"
      ? true
      : req.response.success;
  res.status(code || constants.HTTP_200).json({
    success,
    statusCode: code,
    message: message,
    data: data,
  });
};
