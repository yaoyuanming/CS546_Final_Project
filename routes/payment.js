const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.products;
const user = data.users;
const payment = data.payment;
const neworder = data.orders;

router.get("/:id", async (req, res) => {
    var allProd = await productData.getAllProd();
    var frontPageProd = allProd.slice(0,3);
    if(typeof req.cookies.AuthCookie === 'undefined') {
        
        res.render('home', {products: frontPageProd});
    } else {
        
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        var cart = cookieUser.cart;
        /*if(cart.length === 0) {
            res.render('payment', {user: cookieUser,  error: "No items in your shopping cart!"})
        }*/
         res.render('payment', { user: cookieUser, cart: cart});
    }
});

router.post("/:id", async (req, res) => {
    const cardName = req.body.card-holder-name;
    const cardNumber = req.body.card-number;
    const expiryMonth = req.body.expiry-month;
    const expiryYear = req.body.expiry-year;
    const CVV = req.body.cvv;
    var newOrder = await neworder.createNewOrder(req.cookies.AuthCookie, cart);
    
    var newpayment = await payment.addPayment(cardNumber, newOrder._id);
    var paymentadded = await neworder.addPaymentToOrder(newpayment, neworder._id);
    console.log("payment")
    res.render('success', { message: "Your Order has been placed!" });

})


router.get('/logout', (req, res) => {
    res.cookie("AuthCookie", "", {expires: new Date() });
    res.clearCookie("AuthCookie");
    res.render('logout', {title: 'logout'})
});

module.exports = router;