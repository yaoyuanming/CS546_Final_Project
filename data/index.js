const userData = require("./users");
const productData = require("./products");
const credentialData = require("./userCredentials");
const reviewData = require("./reviews");
const cartData = require("./userCart");
const orderData = require("./orders");
const paymentData = require("./payment");

let constructorMethod = app => {
    app.use("/product", productData);
    app.use("/reviews", reviewData);
    app.use("/credentials", credentialData);
    app.use("/order", orderData);
    app.use("/user", userData);
};

module.exports = {
    users: require("./users"),
    products: require("./products"),
    credentials: require("./credentials"),
    reviews: require("./reviews"),
    userCart: require("./userCart"),
    orders: require("./orders"),
    payment: require("./payment"),
}