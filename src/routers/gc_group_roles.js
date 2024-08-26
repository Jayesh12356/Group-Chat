const express = require("express"),
  router = express.Router(),
  // { validateGetOrderByOrderNumber} = require('../model/orderDetails'),
  { updateGCGroupRoleCont } = require("../controllers/gc_group_roles");

router.post("/updateGCGroupRole", updateGCGroupRoleCont);
module.exports = router;
