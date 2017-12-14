const mongoCollections = require("../config/mongoCollections");
const parties = mongoCollections.parties;
const itemsData = require("./items");
const uuid = require('node-uuid');
const bcrypt = require('bcrypt-nodejs');
var timestamp = require('time-stamp');

async function makeOrder(ids) {
    var order = [];

    for (var i = 0; i < ids.length; i++) {
        // console.log(typeof ids[i]);
        // console.log(ids[i]);        
        var temp = await itemsData.getItemById(ids[i]);
        //console.log(temp);
        order.push(temp); 
    }
    //console.log("This is our order");
    //console.log(order);

    const newOrder = {
        orderId: uuid.v4(),
        timeCreated: timestamp('YYYYMMDD'),
        isCompleted: false,
        items: order
    };

    return newOrder;
}

let exportedMethods = {
    //get all the parties
    async getAllParties() {
        const partiesCollection = await parties();
        var temp = await partiesCollection.find({}).toArray();
        return temp;
    },

    //remove an order from a party, loop through all the parties.
    async removeOrder(id){

    },

    //push order to party
    async addOrder(partyId, itemIds) {
        // console.log(partyId);
        // console.log(typeof partyId);
        if (typeof partyId !== "string") throw "The Party Id is of the wrong type."
        if (!Array.isArray(itemIds)) throw "ItemIds of wrong type.";

        const partiesCollection = await parties();
        const party = await partiesCollection.findOne({ partyId: partyId });
        var order = null;
        try {
            order = await makeOrder(itemIds);
            //console.log(order);
            party.orders.push(order);            
        } catch (error) {
            throw "There was an error trying to push the orders to the party";
        }
        return order;
    },

    //create new party
    async addParty(sName, tNum) {
        if (typeof sName !== "string") throw "No name provided";
        if (typeof tNum !== "number") throw "No table number provided";
    
        const partyCollection = await parties();
    
        const newParty = {
            partyId: uuid.v4(),
            serverName: sName,
            tableNumber: tNum,
            orders: []
        };
    
        const newInsertInformation = await partyCollection.insertOne(newParty);
        const newId = newInsertInformation.insertedId;
        return newId;
    },

    async removeParty(id) {
        if (!id || typeof name !== "id") throw "No id provided";
        
        const partyCollection = await parties();
        const deletionInfo = await partyCollection.removeOne({ _id: id });
    }

    //add Order to Party
}
module.exports = exportedMethods;

//delete party

//delete order from party
