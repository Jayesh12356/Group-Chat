const {
  addGCGroupMemberServ,
  removeGCGroupMemberServ,
  getGCGroupMemberServ,
} = require("../services/gc_group_members");

const addGCGroupMemberCont = async (req, res, next) => {
  try {
    await addGCGroupMemberServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const removeGCGroupMemberCont = async (req, res, next) => {
  try {
    await removeGCGroupMemberServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const getGCGroupMemberCont = async (req, res, next) => {
  try {
    await getGCGroupMemberServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addGCGroupMemberCont,
  removeGCGroupMemberCont,
  getGCGroupMemberCont,
};
