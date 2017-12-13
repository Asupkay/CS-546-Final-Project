const express = require("express");
const router = express.Router();
const data = require("../data");
const partiesData = data.parties;
const itemsData = data.items;

router.get("/", async (req, res) => {
    let parties = await partiesData.getAllParties();
    let items = await itemsData.getAllItems();
    console.log(items);
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
