const testRoutes = require("./test");
const homeRoutes = require("./home");
const signupRoutes = require("./signup")

const constructorMethod = app => {
    app.use("/test", testRoutes),
    app.use("/home", homeRoutes),
    app.use("/signup", signupRoutes)
}

module.exports = constructorMethod;