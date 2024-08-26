const express = require("express"),
  router = express.Router(),
  // { validateGetOrderByOrderNumber} = require('../model/orderDetails'),
  {
    createGCUserCont,
    editGCUserCont,
    loginGCUserCont,
    logoutGCUserCont,
    getAllGCUsersCont,
    isLoggedInCont,
  } = require("../controllers/gc_users");

router.post("/createGCUser", createGCUserCont);
router.post("/editGCUser", editGCUserCont);
router.post("/loginGCUser", loginGCUserCont);
router.post("/logoutGCUser", logoutGCUserCont);
router.post("/getAllGCUsers", getAllGCUsersCont);
router.post("/isLoggedIn", isLoggedInCont);
module.exports = router;
