const dbConnection = require("./mongoConnection");
const data = require("../data/");
const items = data.items;
const users = data.users;
const parties = data.parties;

async function main() {
    try{
        const db = await dbConnection();
<<<<<<< HEAD
        //console.log("This is the db " + db);
=======
        console.log("This is the db " + db);
>>>>>>> 4fefdc54cee786ddad09a4300209fe4abe8013ec
        var dbc = await db.dropDatabase();
        var name = await users.addUser("AlexFood", "server", "banana");
        var item = await items.addItem("Burger", 45.69);
        var item = await items.addItem("Ice Cream", 35.69);
<<<<<<< HEAD
        // console.log("getting all items");
        // console.log(await items.getAllItems());
        // console.log(await users.getAllUsers());
        // console.log(await parties.getAllParties());
        
=======
        console.log("getting all items");
        console.log(items.getAllItems());
>>>>>>> 4fefdc54cee786ddad09a4300209fe4abe8013ec
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
