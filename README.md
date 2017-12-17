# CS-546-Final-Project

**Description:** Final Project for Web Programming I at Stevens Institute of Technology. This is a point of sale system for a restaurant. It includes the servers sending orders to the kitchen in the back. This is done through an interactive UI for the server where they can select parties or create new ones and add orders too that party. The order will then show up in the kitchen where they can complete the order once it is made.

## Installation Instructions

1. `npm install` - Install the different node modules
2. `service mongod start` - Start up the mongo db
3. `node config/seed.js` - seed the database with a couple users, some parties, and some items
4. `npm start` - start up the server
5. navigate to `localhost:3000`
6. Login with either `username: AlexFood password: banana` to go to the pos system or `username: AlexChef password: banana` to go to the queue

## File Structure

- app.js - express server
- data - data access files
    - index.js - links data together
    - items.js - access the items
    - parties.js - access the parties and orders
    - users.js - access the users
- package.json
- public - public files
    - css - stying files
        - bootstrap files
        - main.css - custom css for pages
    - js - client side javascript
        - login.js - composes an ajax request to check the login
        - pos.js - Manages parties and orders client side before sending them off
        - queue.js - Manages deleting orders 
- routes - different routes
    - index.js
    - login.js - login routes
    - middleware
        - verify.js - used to verify user is logged in
    - pos.js - pos management for creating new parties, and new orders and then putting them in the database 
    - queue.js - queue logic for deleting orders in the database
    - rolecheck.js - when logged in we direct to rolecheck to direct the user to the proper system
- config
    - mongoCollections.js
    - mongoConnection.js
    - seed.js - seed two users, three parties, and some items
    - settings.json
- views 
    - layouts
        - main.handlebars
    - login
        - form.handlebars - login
    - pos
        - register.handlebars - pos for adding items to orders
    - queue
        - parties.handlebars - queue system for the kitchen
