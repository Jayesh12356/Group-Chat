const express = require("express"),
  router = express.Router(),
  // { validateGetOrderByOrderNumber} = require('../model/orderDetails'),
  {
    getGCGroupMessagesCont,
    sendGCMessageCont,
    getGCMessageReactionsCont,
    deleteGCMessageCont,
    editGCMessageCont,
  } = require("../controllers/gc_messages");

router.post("/getGCGroupMessages", getGCGroupMessagesCont);
router.post("/sendGCMessage", sendGCMessageCont);
router.post("/getGCMessageReactions", getGCMessageReactionsCont);
router.post("/deleteGCMessage", deleteGCMessageCont);
router.post("/editGCMessage", editGCMessageCont);

module.exports = router;
