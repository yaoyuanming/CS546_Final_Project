const testRoutes = require("./test");
const homeRoutes = require("./home");
const signupRoutes = require("./signup");
const productRoutes = require("./product");

const constructorMethod = app => {
    app.use("/test", testRoutes),
    app.use("/", homeRoutes),
    app.use("/signup", signupRoutes),
    app.use("/", productRoutes)
}

module.exports = constructorMethod;