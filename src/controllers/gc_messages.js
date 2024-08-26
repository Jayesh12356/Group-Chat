const {
  sendGCMessageServ,
  getGCGroupMessagesServ,
  getGCMessageReactionsServ,
  editGCMessageServ,
  deleteGCMessageServ,
} = require("../services/gc_messages");

const getGCGroupMessagesCont = async (req, res, next) => {
  try {
    await getGCGroupMessagesServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const sendGCMessageCont = async (req, res, next) => {
  try {
    await sendGCMessageServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const getGCMessageReactionsCont = async (req, res, next) => {
  try {
    await getGCMessageReactionsServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const editGCMessageCont = async (req, res, next) => {
  try {
    await editGCMessageServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

const deleteGCMessageCont = async (req, res, next) => {
  try {
    await deleteGCMessageServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGCGroupMessagesCont,
  sendGCMessageCont,
  getGCMessageReactionsCont,
  deleteGCMessageCont,
  editGCMessageCont,
};
