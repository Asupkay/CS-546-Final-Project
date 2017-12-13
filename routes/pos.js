const express = require("express");
const router = express.Router();
const data = require("../data");
const partiesData = data.parties;
//const itemsData = data.items;

router.get("/", (req, res) => {
    //let parties = partiesData.getAllParties();
    //let items = itemsData.getAllItems();
    let parties = [
                    {
                        partyId: "1",
                        tableNumber: "2"
                    },
                    {
                        partyId: "2",
                        tableNumber: "3"
                    }
                  ];
    let items = [
                        {
                            itemId: "1",
                            name: "burger"
                        },
                        {
                            itemId: "2",
                            name: "icecream"
                        }
                 ]; 
    res.render('pos/register', {parties: parties, items: items});

});

//TODO: NEED TO CHECK USER HERE BUT DONT KNOW IF IT WILL WORK
router.post('/', async (req, res) => {
    let orderInfo = req.body;

    if(orderInfo.partyId) {
        await partiesData.addOrder(orderInfo.partyID, orderInfo.itemIDs);
    } else {
        //TODO: Make new party and then push the order        
    }
});

module.exports = router;
