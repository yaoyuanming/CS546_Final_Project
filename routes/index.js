const testRoutes = require("./test");

const constructorMethod = app => {
    app.use("/test", testRoutes);
}

module.exports = constructorMethod;