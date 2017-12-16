const express = require('express');
const router = express.Router();
const verify = require('./middleware/verify');

router.post('/', (req, res) => {
    if(req.body.role === "chef") {
        res.send("/queue");
    } else {
        res.send("/pos");
    }
});

module.exports = router;
