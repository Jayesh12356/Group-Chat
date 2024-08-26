const {
  create,
  update,
  findAll,
  hardDelete,
} = require("../../utils/mysqlcrudcommon");

const getGCUser = async (filter = {}) => {
  return findAll({ filter, modelName: "GCUser" });
};

const createGCUser = async (createObj) => {
  return create({ createObj, modelName: "GCUser" });
};

const updateGCUser = async (updateObj, filter) => {
  return update({ updateObj, filter, modelName: "GCUser" });
};

const deleteGCUser = async (filter) => {
  return hardDelete({ filter, modelName: "GCUser" });
};

module.exports = {
  getGCUser,
  createGCUser,
  updateGCUser,
  deleteGCUser,
};
