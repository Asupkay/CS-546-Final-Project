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
    console.log("this is our new order");
    console.log(newOrder);
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
    async completeOrder(id){
        if(typeof id !== "string") throw "The id you provided is not a string.";

        const partiesCollection = await parties();
        var allOurParties = this.getAllParties();
        for (let i = 0; i < allOurParties.length; i++) {
            for (let index = 0; index < allOurParties[i].orders.length; index++) {
                const element = allOurParties[i].orders[index];
                if(element.orderId === id) element.isCompleted = true;
            }
        }
        
    },

    //push order to party
    async addOrder(id, itemIds) {
        // console.log(id);
        // console.log(typeof id);
        if (typeof id !== "string") throw "The Party Id is of the wrong type.";
        if (!Array.isArray(itemIds)) throw "ItemIds of wrong type.";

        const partiesCollection = await parties();
        const party = await partiesCollection.findOne({ partyId: id });
        var order = null;
        var updatedParty = {};
        
        updatedParty.serverName = party.serverName;
        updatedParty.partyId = id;
        updatedParty.tableNumber = party.tableNumber;
        updatedParty.orders = party.orders;
        try {
            order = await makeOrder(itemIds);
            //console.log(order);
            //party.orders.push(order);
            updatedParty.orders.push(order);
            console.log("this is my updatedParty.orders");
            console.log(updatedParty.orders);            
        } catch (error) {
            throw "There was an error trying to push the orders to the party";
        }
        
        let updateCommand = {
            $set: updatedParty
        };
        const query = {
            partyId: id
        };
        await partiesCollection.updateOne(query, updateCommand);
        return order;
    },

    //create new party
    async addParty(sName, tNum) {
        if (typeof sName !== "string") throw "No name provided";
        if (typeof tNum !== "number") throw "No table number provided";
    
        const partyCollection = await parties();
        const newPartyId = uuid.v4()
    
        const newParty = {
            partyId: newPartyId,
            serverName: sName,
            tableNumber: tNum,
            orders: []
        };
    
        const newInsertInformation = await partyCollection.insertOne(newParty);
        const newId = newInsertInformation.insertedId;
        return newPartyId;
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
