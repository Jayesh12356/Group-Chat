const { findAll } = require("../../utils/mysqlcrudcommon");

const getGCMessageReactions = async (filter = {}) => {
  return findAll({ filter, modelName: "GCMessageWithReactions" });
};

module.exports = {
  getGCMessageReactions,
};
