const express = require("express"),
  router = express.Router(),
  // { validateGetOrderByOrderNumber} = require('../model/orderDetails'),
  {
    addGCGroupMemberCont,
    removeGCGroupMemberCont,
    getGCGroupMemberCont,
  } = require("../controllers/gc_group_members");

router.post("/addGCGroupMember", addGCGroupMemberCont);
router.post("/removeGCGroupMember", removeGCGroupMemberCont);
router.post("/getGCGroupMember", getGCGroupMemberCont);

module.exports = router;
