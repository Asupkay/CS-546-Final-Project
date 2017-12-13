const dbConnection = require("./mongoConnection");
const data = require("../data/");
const items = data.items;
const users = data.users;

async function main() {
    try{
        const db = await dbConnection();
        console.log("This is the db " + db);
        // //var dbc = await db.dropDatabase();
        var name = await users.addUser("AlexFood", "server", "banana");
        //var item = await items.addItem("Burger", 45.69);
        // var item = await items.addItem("Ice Cream", 35.69);
        console.log("getting all items");
        //console.log(items.getAllItems());
        db.close();
    } catch(error){
        throw error;
    }
};

try {
    main();
} catch (error) {
    throw error;
}
