const express = require('express');
const router = express.Router();
const verify = require('./middleware/verify');

router.get('/rolecheck', verify.ensureLoggedIn, (req, res) => {
    if(req.user.role == "chef") {
        res.redirect("/queue");
    } else {
        res.redirect("/pos");
    }
});

module.exports = router;
