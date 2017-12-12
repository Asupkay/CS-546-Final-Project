module.exports = {
  ensureLoggedIn: (req, res, next) => {
    if (req.user) {
        return next();
    } else {
        res.redirect('/login');
    }
  },

  preventDoubleLogin: (req, res, next) => {
    if (req.user) {
     res.redirect('/rolecheck');
    } else {
     return next();
    }
  }
};
