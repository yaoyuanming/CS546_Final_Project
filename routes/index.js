const testRoutes = require("./test");
const homeRoutes = require("./home");

const constructorMethod = app => {
    app.use("/test", testRoutes),
    app.use("/home", homeRoutes)
}

module.exports = constructorMethod;