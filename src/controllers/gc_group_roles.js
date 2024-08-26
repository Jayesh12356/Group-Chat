const { updateGCGroupRoleServ } = require("../services/gc_group_roles");

const updateGCGroupRoleCont = async (req, res, next) => {
  try {
    await updateGCGroupRoleServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateGCGroupRoleCont,
};
