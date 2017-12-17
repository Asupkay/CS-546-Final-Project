const express = require("express");
const router = express.Router();
const data = require("../data");
const partiesData = data.parties;

router.get('/', async (req, res) => {
  let parties = await partiesData.getAllParties();

  var filtered = JSON.parse(JSON.stringify(parties));
  for (party in filtered) {
    for (var i = filtered[party].orders.length - 1; i >= 0; i--) {
      if (filtered[party].orders[i].isCompleted == true) {
        filtered[party].orders.splice(i, 1);
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
