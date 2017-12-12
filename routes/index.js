const loginRoutes = require("./login");
const queueRoutes = require("./queue");
const pos = require("./pos");

const constructorMethod = (app) => {
    app.use("/login", loginRoutes);
    app.use("/queue", commentRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
