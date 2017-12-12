modules.exports = {
  function ensureLoggedIn(req, res, next) {
    if (req.user) {
        return next();
    } else {
        res.redirect('/login');
    }
  },

  function preventDoubleLogin(req, res, next) {
    if (req.user) {
     res.redirect('/rolecheck');
    } else {
     return next();
    }
  }
};
