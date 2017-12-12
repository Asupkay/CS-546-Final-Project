const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let items = [
                        {
                            id: "1",
                            name: "burger"
                        },
                        {
                            id: "2",
                            name: "icecream"
                        }
                 ]; 
    res.render('pos/register', {items: items});

});

router.post('/', (req, res) => {
    console.log(req.body);
    if (req.user) {
        console.log("here2");
        let order = req.body.order;

        //TODO: Push to database here
    }
});

module.exports = router;
