const express = require("express"),
  router = express.Router(),
  // { validateGetOrderByOrderNumber} = require('../model/orderDetails'),
  {
    createGCGroupCont,
    editGCGroupCont,
    deleteGCGroupCont,
    searchGCGroupCont,
  } = require("../controllers/gc_groups");

router.post("/createGCGroup", createGCGroupCont);
router.post("/editGCGroup", editGCGroupCont);
router.post("/deleteGCGroup", deleteGCGroupCont);
router.post("/searchGCGroup", searchGCGroupCont);
module.exports = router;
