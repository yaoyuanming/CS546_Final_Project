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
    if(typeof req.cookies.AuthCookie === 'undefined') {

        res.render('home', {products: frontPageProd});
    } else {
        try{
        const cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        const cardName = req.body.cardholdername;
        const cardNumber = req.body.cardnumber;
        const expiryMonth = req.body.expirymonth;
        const expiryYear = req.body.expiryyear;
        const CVV = req.body.cvv;
        var userOrder = await neworder.createNewOrder(cookieUser.email, cookieUser.cart);

        var newpayment = await payment.addPayment(cardNumber, userOrder._id);
        var paymentadded = await neworder.addPaymentToOrder(newpayment, userOrder._id);
         await user.addOrderToUser(cookieUser._id, paymentadded._id);
           await usercart.emptyCart(cookieUser._id);
        res.render('success', {message: "Your Order has been placed!"});}
        catch(e){
            throw e
            //res.render('payment', {error: "pay failed"});
        }
    }
})




module.exports = router;