const { reactToMessageServ } = require("../services/gc_likes");

const reactToMessageCont = async (req, res, next) => {
  try {
    await reactToMessageServ(req);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  reactToMessageCont,
};
