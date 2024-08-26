const {
  create,
  update,
  findAll,
  hardDelete,
} = require("../../utils/mysqlcrudcommon");

const getGCGroupMember = async (filter = {}) => {
  return findAll({ filter, modelName: "GCGroupMember" });
};

const createGCGroupMember = async (createObj) => {
  return create({ createObj, modelName: "GCGroupMember" });
};

const updateGCGroupMember = async (updateObj, filter) => {
  return update({ updateObj, filter, modelName: "GCGroupMember" });
};

const deleteGCGroupMember = async (filter) => {
  return hardDelete({ filter, modelName: "GCGroupMember" });
};

module.exports = {
  getGCGroupMember,
  createGCGroupMember,
  updateGCGroupMember,
  deleteGCGroupMember,
};
