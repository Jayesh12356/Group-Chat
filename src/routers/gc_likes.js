const express = require("express"),
  router = express.Router(),
  // { validateGetOrderByOrderNumber} = require('../model/orderDetails'),
  { reactToMessageCont } = require("../controllers/gc_likes");

router.post("/reactToMessage", reactToMessageCont);
module.exports = router;
