const testRoutes = require("./test");
const homeRoutes = require("./home");
const signupRoutes = require("./signup");
const productRoutes = require("./product");
const myaccountRoutes = require("./myaccount");
const cartRoutes = require("./cart");
const wishlishRoutes = require("./wishlish")

const constructorMethod = app => {
    app.use("/test", testRoutes),
    app.use("/", homeRoutes),
    app.use("/signup", signupRoutes),
    app.use("/", productRoutes),
    app.use("/myaccount",myaccountRoutes),
    app.use("/cart",cartRoutes),
    app.use("/wishlish",wishlishRoutes)
}

module.exports = constructorMethod;
