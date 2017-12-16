const express = require("express");
const router = express.Router();
const data = require("../data");
const partiesData = data.parties;

router.get('/', async (req, res) => {
  let parties = await partiesData.getAllParties();

  var filtered = JSON.parse(JSON.stringify(parties));

  for (party in filtered) {
    for (order in filtered[party].orders) {
      if (filtered[party].orders[order].isCompleted === true) {
        filtered[party].orders.splice(order, 1);
      }
    }
  }

  res.render('queue/parties', {parties: filtered});
});

//post a number to delete an order from the queue
router.post('/', async (req, res) => {
    let orderInfo = req.body;

    await partiesData.completeOrder(req.body.orderId);

    res.send("/queue");
});

module.exports = router;
