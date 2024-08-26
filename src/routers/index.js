const express = require("express"),
  router = express.Router();

router.use(require("./gc_users"));
router.use(require("./gc_group_members"));
router.use(require("./gc_group_roles"));
router.use(require("./gc_likes"));
router.use(require("./gc_groups"));
router.use(require("./gc_messages"));

module.exports = router;
