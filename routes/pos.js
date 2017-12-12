const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    if (req.user) {
        res.render('pos/register');
    } else {
        res.redirect('/login');
    }

});

router.post('/', (req, res) => {
    if (req.user) {
        let order = req.body.order;

        //TODO: Push to database here
    }
}
