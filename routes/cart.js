const express = require("express");
const router = express.Router();
const data = require("../data");
const user = data.users;
const productData = data.products;

router.get("/:id", async (req, res) => {
    var allProd = await productData.getAllProd();
    var frontPageProd = allProd.slice(0,3);
    if(typeof req.cookies.AuthCookie === 'undefined') {
        
        res.render('home', {products: frontPageProd});
    } else {
        
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        var cart = cookieUser.cart;
        if(cart.length === 0) {
            console.log("length is 0")
            res.render('cart', {user: cookieUser,  error: "No items in your shopping cart!"})
        }
        else res.render('cart', { user: cookieUser, cart: cart});
    }
});



router.get('/logout', (req, res) => {
    res.cookie("AuthCookie", "", {expires: new Date() });
    res.clearCookie("AuthCookie");
    res.render('logout', {title: 'logout'})
});




module.exports = router;