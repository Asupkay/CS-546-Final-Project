const mongoCollections = require("../config/mongoCollections");
const items = mongoCollections.items;
const uuid = require('node-uuid');
const bcrypt = require('bcrypt-nodejs');

let exportedMethods = {
    async getAllItems() {
        const itemsCollection = await items();
        var temp = await itemsCollection.find({}).toArray();
        return temp;
    },

    async getItemById(id) {
        if(typeof id !== "string") throw "ID must be of type string.";
        
        const itemsCollection = await items();
        const item = await itemsCollection.findOne({ itemId: id });
    
        if (!item) throw "Item not found";
        return item;
    },

    async addItem(name, p) {
        if (typeof name !== "string") throw "No name provided";
        if (typeof p !== "number") throw "No price provided";
    
        const itemsCollection = await items();
    
        const newItem = {
            itemId: uuid.v4(),
            itemName: name,
            price: p,
        };
    
        const newInsertInformation = await recipesCollection.insertOne(newItem);
        const newId = newInsertInformation.insertedId;
        return await this.getItemById(newId);
    }
}

module.exports = exportedMethods;
