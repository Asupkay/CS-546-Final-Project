const express = require("express");
const router = express.Router();
const data = require("../data");
const partiesData = data.parties;

router.get('/', (req, res) => {
  //let parties = partiesData.getAllParties();
  //let items = itemsData.getAllItems();

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
                        }]
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
                        }]
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
                        }]
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
                        }]
                      }
                    ]
                  }
                ];

  ///partyData.getAllParties().then((partyList) => {
  //      res.json(partyList);
  //  }).catch((e) => {
  //      res.status(500).json({ error: e });
  //  });
});

module.exports = router;
