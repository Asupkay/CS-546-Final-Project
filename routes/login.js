const express = require("express");
const router = express.Router();
const passport = require('passport');
const JsonStrategy = require('passport-json').Strategy;
const bcrypt = require('bcrypt-nodejs');
const data = require("../data");
const usersData = data.users;


passport.use(new JsonStrategy(
  function(username, password, done) {
    usersData.getUserByName(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      bcrypt.compare(password, user.hashedPassword, (err, res) => {
        if (res === true){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Incorrect password.'});
        }
      });
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  usersData.getUserByName(username).then((user) => {
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
  passport.authenticate('json', function(err, user, info) {
    if (err) {return next(err); }
    if (!user) { res.render('login/form', { message: 'Authentication failed' });}
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      res.send({"url": "/rolecheck", "user": user});
    });
  })(req, res, next);
});

module.exports = router;
