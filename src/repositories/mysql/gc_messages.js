const {
  create,
  update,
  findAll,
  hardDelete,
} = require("../../utils/mysqlcrudcommon");

const getGCMessage = async (filter = {}) => {
  return findAll({ filter, modelName: "GCMessage" });
};

const createGCMessage = async (createObj) => {
  return create({ createObj, modelName: "GCMessage" });
};

const updateGCMessage = async (updateObj, filter) => {
  return update({ updateObj, filter, modelName: "GCMessage" });
};

const deleteGCMessage = async (filter) => {
  return hardDelete({ filter, modelName: "GCMessage" });
};

module.exports = {
  getGCMessage,
  createGCMessage,
  updateGCMessage,
  deleteGCMessage,
};
