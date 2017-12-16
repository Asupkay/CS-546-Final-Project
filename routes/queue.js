const express = require("express");
const router = express.Router();
const data = require("../data");
const partiesData = data.parties;

router.get('/', (req, res) => {
  //let parties = partiesData.getAllParties();
  let parties = [
                  {
                    partyId: "1",
                    tableNumber: "2",
                    orders: [
                      {
                        orderId: "10",
                        items: [
                        {
                          itemId: "200",
                          itemName: "Burger"
                        },
                        {
                          itemId: "100",
                          itemName: "Ice Cream"
                        }],
                        isCompleted: "false"
                      },
                      {
                        orderId: "20",
                        items: [
                        {
                          itemId: "300",
                          itemName: "Pie"
                        },
                        {
                          itemId: "400",
                          itemName: "Fries"
                        }],
                        isCompleted: "false"
                      }
                    ]
                  },
                  {
                    partyId: "2",
                    tableNumber: "3",
                    orders: [
                      {
                        orderId: "30",
                        items: [
                        {
                          itemId: "500",
                          itemName: "Appetizer"
                        },
                        {
                          itemId: "600",
                          itemName: "Beef"
                        }],
                        isCompleted: "false"
                      },
                      {
                        orderId: "40",
                        items: [
                        {
                          itemId: "700",
                          itemName: "Canned Tuna"
                        },
                        {
                          itemId: "800",
                          itemName: "Cranberries"
                        }],
                        isCompleted: "true"
                      }
                    ]
                  }
                ];

  var filtered = JSON.parse(JSON.stringify(parties));

  for (party in filtered) {
    for (order in filtered[party].orders) {
      if (filtered[party].orders[order].isCompleted === "true") {
        delete filtered[party].orders[order];
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
