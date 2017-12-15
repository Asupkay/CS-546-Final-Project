const express = require("express");
const router = express.Router();
const passport = require('passport');
const JsonStrategy = require('passport-json').Strategy;
const bcrypt = require('bcrypt-nodejs');
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

passport.use(new JsonStrategy(
  function(username, password, done) {
    users.findUserByName({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  users.findUserByName(id).then((user) => {
    if (!user) { return cb("error"); }
    cb(null, user);
  });
});

router.get("/", (req, res) => {
    res.render('login/form');
});

// If authentication fails, display an error message
// If authentication succeeds, redirect to /rolecheck
router.post("/", function(req, res, next) {
  console.log(req.body);
  passport.authenticate('json', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.render('login/form', { message: 'Authentication failed' }); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/rolecheck');
    });
  })(req, res, next);
});

module.exports = router;
