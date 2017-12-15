const express = require("express");
const router = express.Router();
const data = require("../data");
const partiesData = data.parties;
const itemsData = data.items;

router.get("/", async (req, res) => {
    let parties = await partiesData.getAllParties();
    let items = await itemsData.getAllItems();
    let user = {
        username: "Alex"
    }
    res.render('pos/register', {parties: parties, items: items, user: user});

});

//TODO: NEED TO CHECK USER HERE BUT DONT KNOW IF IT WILL WORK
router.post('/', async (req, res) => {
    let orderInfo = req.body;

    if(orderInfo.partyId != "New") {
        await partiesData.addOrder(orderInfo.partyId, orderInfo.itemIds);
    } else {
        let newPartyId = await partiesData.addParty(orderInfo.serverName, orderInfo.tableNumber);
        await partiesData.addOrder(newPartyId, orderInfo.itemIds);
    }

    let parties = await partiesData.getAllParties();
    let items = await itemsData.getAllItems();
    let user = {
        username: "Alex"
    }

    res.send('pos');
    //res.render('pos/register', {parties: parties, items: items, user: user});
});

module.exports = router;
