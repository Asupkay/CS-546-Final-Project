const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require('node-uuid');
const bcrypt = require('bcrypt-nodejs');

let exportedMethods = {

    async addUser(name, role, pass) {
        if (typeof name !== "string") throw "No name provided";
        if (typeof role !== "string") throw "No role provided";
        if (typeof pass !== "string") throw "No password provided";
        
        const usersCollection = await users();
        var salt = bcrypt.genSaltSync(10);

        const newUser = {
            _id: uuid.v4(),
            username: name,
            hashedPassword: await bcrypt.hashSync(pass, salt),
            Role: role
        };

        const newInsertInformation = await usersCollection.insertOne(newUser);
        const newId = newInsertInformation.insertedId;
    },
    
    async getUserById(id) {
        if(typeof id !== "string") throw "ID must be of type string.";
        
        const usersCollection = await users();
        const user = await usersCollection.findOne({ _id: id });
    
        if (!user) throw "Item not found";
        return user;
    },

    async getUserByName(username, cb) {
        if(typeof username !== "string") throw "username must be of type string.";
        
        const usersCollection = await users();
        let user = await usersCollection.findOne({ username: username });
        if (!user) throw "Item not found";
        cb(null, user);
        return user;
    },

    async getAllUsers() {
        const usersCollection = await users();
        var temp = await usersCollection.find({}).toArray();
        return temp;
    }
}

module.exports = exportedMethods;
