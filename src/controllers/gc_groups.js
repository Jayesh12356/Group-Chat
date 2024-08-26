const {
  createGCGroupServ,
  editGCGroupServ,
  deleteGCGroupServ,
  searchGCGroupServ,
} = require("../services/gc_groups");

const createGCGroupCont = async (req, res, next) => {
  try {
    await createGCGroupServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const editGCGroupCont = async (req, res, next) => {
  try {
    await editGCGroupServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const deleteGCGroupCont = async (req, res, next) => {
  try {
    await deleteGCGroupServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const searchGCGroupCont = async (req, res, next) => {
  try {
    await searchGCGroupServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGCGroupCont,
  editGCGroupCont,
  deleteGCGroupCont,
  searchGCGroupCont,
};
