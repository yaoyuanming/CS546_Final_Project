const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.products;
const user = data.users;
const payment = data.payment;


router.get("/:id", async (req, res) => {
    var allProd = await productData.getAllProd();
    var frontPageProd = allProd.slice(0,3);
    if(typeof req.cookies.AuthCookie === 'undefined') {
        
        res.render('home', {products: frontPageProd, error: "Please Login!"});
    } else {
        
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        var cart = cookieUser.cart;
        if(cart.length === 0) {
            res.render('neworder', {user: cookieUser,  error: "No items in your shopping cart!"})
        }
        else res.render('neworder', { user: cookieUser, cart: cart});
    }
    
 });

 router.get('/logout', (req, res) => {
    res.cookie("AuthCookie", "", {expires: new Date() });
    res.clearCookie("AuthCookie");
    res.render('logout', {title: 'logout'})
});

 module.exports = router;