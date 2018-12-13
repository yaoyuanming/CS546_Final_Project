const express = require("express");
const router = express.Router();
const data = require("../data");
const user = data.users;
const productData = data.products;

router.get("/:id", async (req, res) => {
    let allProd = await productData.getAllProd();
    let frontPageProd = allProd.slice(0,3);
    if(typeof req.cookies.AuthCookie === 'undefined') {

        res.render('home', {products: frontPageProd});
    } else {

        let cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        let carts = cookieUser.cart;
        if(carts.length === 0) {
            //console.log("length is 0")
            res.render('cart', {user: cookieUser,  error: "No items in your shopping cart!"})
        }
        else {
            cartProducts=[]
            for(var i = 0 ; i < carts.length; i++) {
                product=await productData.getProdById(carts[i])
                cartProducts.push(product);
            }
            res.render('cart', { user: cookieUser, cartProducts: cartProducts});
        }
    }
});



router.get('/logout', (req, res) => {
    res.cookie("AuthCookie", "", {expires: new Date() });
    res.clearCookie("AuthCookie");
    res.render('logout', {title: 'logout'})
});




module.exports = router;