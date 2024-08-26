const router = require('express').Router(),
  apm = require('elastic-apm-node');

//router.use(require('../authentication/mysso'));
/*
router.use((req, res, next) => {
  apm.setUserContext({
    id: req.user.domain,
    username: req.user.fullname,
    email: req.user.emailID,
  });
  if (
    apm &&
    apm.currentTransaction &&
    apm.currentTransaction.traceparent &&
    req.user &&
    req.user.sessionId
  ) {
    apm.addLabels({
      correlation_id: apm.currentTransaction.traceparent,
      sessionId: req.user.sessionId
    });
  }

  next();
});
*/
module.exports = router;