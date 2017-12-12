//imports
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

const app = express();
const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

//handlebars
app.use('/public', static);
app.use(bodyParser.json());

//default layout. set to default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//routes
passport.use(new Strategy(
  function(username, password, done) {
    users.findByUsername(username).then((user) => {
      bcrypt.compare(password, user.hashedPassword, (err, res) => {
        if (res === true) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }).catch(function() {
        return done(null, false); 
    });
}));

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function(id, cb) {
  users.findById(id).then((user) => {
    if (!user) { return cb('error'); }
    cb(null, user);
  });
});

app.use(require('body-parser').urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

function ensureLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.redirect('/');
    }
}

function preventDoubleLogin(req, res, next) {
  if (req.user) {
    res.redirect('/rolecheck');
  } else {
    return next();
  }
}

// if not logged in, redirect to /login. else, redirect to rolecheck
app.get('/', preventDoubleLogin, function(req, res) {
  res.render('login');
});

// If authentication fails, display an error message
// If authentication succeeds, redirect to /rolecheck
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.render('login', { message: 'Authentication failed' }); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/rolecheck');
    });
  })(req, res, next);
});

// If not logged in, redirect to /login, else render rolecheck with req.user
app.get('/rolecheck', ensureLoggedIn, function(req, res) {
    res.render('rolecheck', { user: req.user });
});

// If user clicks logout button, log the user out and redirect to / 
app.post('/logout', function(req, res) {
  req.logout();
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
