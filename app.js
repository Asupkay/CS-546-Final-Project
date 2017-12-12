//imports
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

const app = express();
const configRoutes = require("./routes");
const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

//handlebars
app.use('/public', static);
app.use(bodyParser.json());
configRoutes(app);

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

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'donttellme', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
