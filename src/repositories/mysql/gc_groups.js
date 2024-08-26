const {
  create,
  update,
  findAll,
  hardDelete,
} = require("../../utils/mysqlcrudcommon");

const getGCGroup = async (filter = {}) => {
  return findAll({ filter, modelName: "GCGroup" });
};

const createGCGroup = async (createObj) => {
  return create({ createObj, modelName: "GCGroup" });
};

const updateGCGroup = async (updateObj, filter) => {
  return update({ updateObj, filter, modelName: "GCGroup" });
};

const deleteGCGroup = async (filter) => {
  return hardDelete({ filter, modelName: "GCGroup" });
};

module.exports = {
  getGCGroup,
  createGCGroup,
  updateGCGroup,
  deleteGCGroup,
};
