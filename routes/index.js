const loginRoutes = require("./login");
const queueRoutes = require("./queue");
const posRoutes = require("./pos");
const verify = require("./middleware/verify");

const constructorMethod = (app) => {
    app.use("/login", loginRoutes);
    app.use("/pos", posRoutes);
    app.use("/queue", queueRoutes);

    // if not logged in, redirect to /login. else, redirect to rolecheck
    app.get('/', verify.preventDoubleLogin, function(req, res) {
        res.redirect('login');
    });

    // If not logged in, redirect to /login, else render rolecheck with req.user
    app.get('/rolecheck', verify.ensureLoggedIn, function(req, res) {
        res.render('rolecheck', { user: req.user });
    });

    // If user clicks logout button, log the user out and redirect to / 
    app.post('/logout', function(req, res) {
      req.logout();
        res.redirect('/');
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;

