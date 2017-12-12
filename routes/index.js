const loginRoutes = require("./login");
const queueRoutes = require("./queue");
const loginRoutes = require("./login");
const pos = require("./pos");

const constructorMethod = (app) => {
    app.use("/login", loginRoutes);
    app.use("/pos", posRoutes);
    app.use("/queue", queueRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;
