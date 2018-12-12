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
        let wishs = cookieUser.wishlists;
        if(wishs.length === 0) {
            console.log("length is 0")
            res.render('cart', {user: cookieUser,  error: "No items in your wishlists!"})
        }
        else {
            wishProducts=[]
            for(var i = 0 ; i < wishs.length; i++) {
                product=await productData.getProdById(wishs[i])
                wishProducts.push(product);
            }
            res.render('wishlist', { user: cookieUser, wishProducts: wishProducts});
        }
    }
});



router.get('/logout', (req, res) => {
    res.cookie("AuthCookie", "", {expires: new Date() });
    res.clearCookie("AuthCookie");
    res.render('logout', {title: 'logout'})
});



module.exports = router;