const testRoutes = require("./test");
const homeRoutes = require("./home");
const signupRoutes = require("./signup");
const productRoutes = require("./product");
const productsbycatRoutes = require("./productsbycat")
const myaccountRoutes = require("./myaccount");
const cartRoutes = require("./cart");
const wishlishRoutes = require("./wishlist")
const orderRoutes = require("./newOrder")
const paymentRoutes = require('./payment')


const constructorMethod = app => {
    app.use("/test", testRoutes),
    app.use("/", homeRoutes),
    app.use("/signup", signupRoutes),
    app.use("/", productRoutes),
    app.use("/myaccount",myaccountRoutes),
    app.use("/cart",cartRoutes),
    app.use("/wishlist",wishlishRoutes),
    app.use("/order",orderRoutes),
    app.use("/payment",paymentRoutes),
    app.use("/productsbycat",productsbycatRoutes)
}

module.exports = constructorMethod;
