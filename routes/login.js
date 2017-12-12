const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render('login/form');
});

// If authentication fails, display an error message
// If authentication succeeds, redirect to /rolecheck
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.render('login/form', { message: 'Authentication failed' }); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/rolecheck');
    });
  })(req, res, next);
});

module.exports = router;
