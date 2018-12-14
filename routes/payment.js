const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.products;
const user = data.users;
const payment = data.payment;
const neworder = data.orders;
const usercart=data.userCart;

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
        proList=[]
        thisOreder=cookieUser.cart;
        for(let i = 0 ; i < thisOreder.length; i++ ){
                orderPro=await productData.getProdById(thisOreder[i]);
               proList.push(orderPro);
            }
        for(let a = 0 ; a < proList.length; a++ ){
            proPrice=proList[a].quantity;
            if(parseInt(proPrice)==0){
                res.render('payment', {error: "pay failed，Commodity shortage  "});
            }
            else{
                updatedProd = {
                    quantity: parseInt(proPrice)-1,
                };
                await productData.updateProd(proList[a]._id, updatedProd);
            }
        }
        var userOrder = await neworder.createNewOrder(cookieUser.email, cookieUser.cart);

        var newpayment = await payment.addPayment(cardNumber, userOrder._id);
        var paymentadded = await neworder.addPaymentToOrder(newpayment, userOrder._id);
        await user.addOrderToUser(cookieUser._id, paymentadded._id);

        await usercart.emptyCart(cookieUser._id);
        res.render('success', {user: cookieUser,message: "Your Order has been placed!"});}
        catch(e){
            //throw e;
            res.render('payment', {error: "pay failed"});
        }
    }
})


router.get('/logout', (req, res) => {
    res.cookie("AuthCookie", "", {expires: new Date() });
    res.clearCookie("AuthCookie");
    res.render('logout', {title: 'logout'})
});

module.exports = router;
