const mongoCollections = require("../config/mongoCollections");
const parties = mongoCollections.parties;
const itemsData = require("./items");
const uuid = require('node-uuid');
const bcrypt = require('bcrypt-nodejs');
var timestamp = require('time-stamp');

async function makeOrder(ids, price) {
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
        price: price,
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
    async completeOrder(id){
        if(typeof id !== "string") throw "The id you provided is not a string.";

        const partiesCollection = await parties();
        var allOurParties = await this.getAllParties();
        var breakOut = false;
        var partyIdForQuery = null;

        var updatedParty = {};

        for (let i = 0; i < allOurParties.length; i++) {
            for (let index = 0; index < allOurParties[i].orders.length; index++) {
                if(allOurParties[i].orders[index].orderId === id) {
                    //set our found party.isCompleted to true.
                    allOurParties[i].orders[index].isCompleted = true;
                    // to query for update
                    partyIdForQuery = allOurParties[i].partyId; 
                    //assign all the values to the party to be updated in the table.
                    updatedParty.partyId = allOurParties[i].partyId;
                    updatedParty.serverName = allOurParties[i].serverName;
                    updatedParty.tableNumber = allOurParties[i].tableNumber;
                    updatedParty.orders = allOurParties[i].orders;
                    breakOut = true;
                    break;
                }
            }
            if(breakOut) break;
        }
        let updateCommand = {
            $set: updatedParty
        };
        const query = {
            partyId: partyIdForQuery
        };
        await partiesCollection.updateOne(query, updateCommand);
    },

    //push order to party
    async addOrder(id, itemIds, price) {
        // console.log(id);
        // console.log(typeof id);
        if (typeof id !== "string") throw "The Party Id is of the wrong type.";
        if (!Array.isArray(itemIds)) throw "ItemIds of wrong type.";
        if (typeof price !== "number") throw "Price must be a number.";

        const partiesCollection = await parties();
        const party = await partiesCollection.findOne({ partyId: id });
        var order = null;
        var updatedParty = {};
        
        updatedParty.serverName = party.serverName;
        updatedParty.partyId = id;
        updatedParty.tableNumber = party.tableNumber;
        updatedParty.orders = party.orders;
        try {
            order = await makeOrder(itemIds, price);
            //console.log(order);
            //party.orders.push(order);
            updatedParty.orders.push(order);
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
