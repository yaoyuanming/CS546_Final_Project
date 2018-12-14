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




router.post('/:id', async (req, res) => {
    const productId = req.body.proid;

    if(typeof req.cookies.AuthCookie === 'undefined') {

        res.render('home', {products: frontPageProd});
    } else {

        let cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        await userWishL.deleteItemFromWish(cookieUser._id, productId);
        res.redirect("/wishlist/"+cookieUser._id.toString())

    }
});






module.exports = router;