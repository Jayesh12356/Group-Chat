const {
  create,
  update,
  findAll,
  hardDelete,
} = require("../../utils/mysqlcrudcommon");

const getGCLike = async (filter = {}) => {
  return findAll({ filter, modelName: "GCLike" });
};

const createGCLike = async (createObj) => {
  return create({ createObj, modelName: "GCLike" });
};

const updateGCLike = async (updateObj, filter) => {
  return update({ updateObj, filter, modelName: "GCLike" });
};

const deleteGCLike = async (filter) => {
  return hardDelete({ filter, modelName: "GCLike" });
};

module.exports = {
  getGCLike,
  createGCLike,
  updateGCLike,
  deleteGCLike,
};
