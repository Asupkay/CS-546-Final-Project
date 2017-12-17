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

- app.js
- data
    - index.js
    - items.js
    - parties.js
    - users.js
- package.json
- public
    - css
        - main.css
    - js
        - login.js
        - pos.js
        - queue.js
- routes
    - index.js
    - login.js
    - middleware
        - verify.js
    - pos.js
    - queue.js
    - rolecheck.js
- config
    - mongoCollections.js
    - mongoConnection.js
    - seed.js
    - settings.json
- views 
    - layouts
        - main.handlebars
    - login
        - form.handlebars
    - pos
        - register.handlebars
    - queue
        - parties.handlebars
