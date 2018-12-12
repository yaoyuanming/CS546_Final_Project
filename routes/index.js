const testRoutes = require("./test");
const homeRoutes = require("./home");
const signupRoutes = require("./signup");
const productRoutes = require("./product");
const myaccountRoutes = require("./myaccount");
const cartRoutes = require("./cart");
const wishlishRoutes = require("./wishlist")
const paymentRoutes = require("./payment");
const neworderRoutes = require("./newOrder");
const productsbycatRoutes = require("./productsbycat")

const constructorMethod = app => {
    app.use("/test", testRoutes),
    app.use("/", homeRoutes),
    app.use("/signup", signupRoutes),
    app.use("/", productRoutes),
    app.use("/myaccount",myaccountRoutes),
    app.use("/cart",cartRoutes),
    app.use("/wishlist",wishlishRoutes),
    app.use("/payment", paymentRoutes),
    app.use("/neworder", neworderRoutes),
    app.use("/productsbycat",productsbycatRoutes)
}

module.exports = constructorMethod;
