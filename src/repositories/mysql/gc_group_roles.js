const {
  create,
  update,
  findAll,
  hardDelete,
} = require("../../utils/mysqlcrudcommon");

const getGCGroupRole = async (filter = {}) => {
  return findAll({ filter, modelName: "GCGroupRole" });
};

const createGCGroupRole = async (createObj) => {
  return create({ createObj, modelName: "GCGroupRole" });
};

const updateGCGroupRole = async (updateObj, filter) => {
  return update({ updateObj, filter, modelName: "GCGroupRole" });
};

const deleteGCGroupRole = async (filter) => {
  return hardDelete({ filter, modelName: "GCGroupRole" });
};

module.exports = {
  getGCGroupRole,
  createGCGroupRole,
  updateGCGroupRole,
  deleteGCGroupRole,
};
