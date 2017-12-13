const express = require("express");
const router = express.Router();
const data = require("../data");
const partiesData = data.parties;

router.get("/", (req, res) => {
    let parties = [
                    {
                        partyID: "1",
                        tableNumber: "2"
                    },
                    {
                        partyID: "2",
                        tableNumber: "3"
                    }
                  ];
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
    res.render('pos/register', {parties: parties, items: items});

});

//TODO: NEED TO CHECK USER HERE BUT DONT KNOW IF IT WILL WORK
router.post('/', async (req, res) => {
    let orderInfo = req.body;

    if(orderInfo.partyID) {
        await partiesData.addOrder(orderInfo.partyID, orderInfo.itemIDs);
    } else {
        //TODO: Make new party and then push the order        
    }
});

module.exports = router;
