const {
  createGCUserServ,
  editGCUserServ,
  loginGCUserServ,
  logoutGCUserServ,
  getAllGCUsersServ,
  isLoggedInServ,
} = require("../services/gc_users");

const createGCUserCont = async (req, res, next) => {
  try {
    await createGCUserServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const editGCUserCont = async (req, res, next) => {
  try {
    await editGCUserServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const loginGCUserCont = async (req, res, next) => {
  try {
    await loginGCUserServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const logoutGCUserCont = async (req, res, next) => {
  try {
    await logoutGCUserServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const getAllGCUsersCont = async (req, res, next) => {
  try {
    await getAllGCUsersServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const isLoggedInCont = async (req, res, next) => {
  try {
    await isLoggedInServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGCUserCont,
  editGCUserCont,
  loginGCUserCont,
  logoutGCUserCont,
  getAllGCUsersCont,
  isLoggedInCont,
};
