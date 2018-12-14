const express = require("express");
const router = express.Router();
const data = require("../data");
const products = data.products;
const user = data.users;
const userCart = require('../data/userCart');
const userWishL = require('../data/userWishlists');
const reviewData = data.reviews;

router.get("/products", async (req, res) => {
    var allProd = await products.getAllProd();
    
    if(typeof req.cookies.AuthCookie === 'undefined') {
        
        res.render('products', {products: allProd});
    } else {
        
        console.log(req.cookies.AuthCookie)
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        res.render('products', {products: allProd, user: cookieUser});
    }
});

// getProdByCat
// getProdByTitle
var thisProd;
router.get("/products/:id", async (req, res) => {

	 thisProd = await products.getProdById(req.params.id);

    var reviewForProd = await reviewData.getReviewByProdId(thisProd._id);
	if(typeof req.cookies.AuthCookie === 'undefined') {
        
        res.render('thisprod_unlogin', {products: thisProd});

    } else {
        
        console.log(req.cookies.AuthCookie)
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        console.log(reviewForProd);
        res.render('thisprod', {user: cookieUser,reviews:reviewForProd, products: thisProd});
    }

});
router.post('/products/cart/add', async (req, res) => {
    const productId = req.body.cartproid;

    if(typeof req.cookies.AuthCookie === 'undefined') {

        res.render('home', {products: frontPageProd});
    } else {

        let cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        let allcarts = cookieUser.cart;
        if(allcarts.indexOf(productId)>=0){
            res.redirect("/cart/"+cookieUser._id.toString())
        }
        else{
         await userCart.addItemToCart(cookieUser._id, productId);
        res.redirect("/cart/"+cookieUser._id.toString())
        }

    }
});

router.post('/products/wish/add', async (req, res) => {
    const productId = req.body.wishproid;

    if(typeof req.cookies.AuthCookie === 'undefined') {

        res.render('home', {products: frontPageProd});
    } else {

        let cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        let allwishs = cookieUser.wishlists;
        if(allwishs.indexOf(productId)>=0){
            res.redirect("/wishlist/"+cookieUser._id.toString())
        }
        else{
            await userWishL.addItemToWish(cookieUser._id, productId);
            res.redirect("/wishlist/"+cookieUser._id.toString())
        }

    }
});

router.post("/products/reviews",async (req, res) => {
    if(typeof req.cookies.AuthCookie === 'undefined') {

        res.render('home', {products: frontPageProd});
    }else {
        let cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
    var newRev = await reviewData.addReview(req.body.title, req.body.review, req.body.rating, cookieUser._id, thisProd._id);
    var revtouser = await user.addReviewToUser(cookieUser._id, newRev._id, newRev.title);
    var revtoprod = await products.addReviewToProd(thisProd._id, newRev._id, newRev.title);
    res.json({
        user: cookieUser,
        product: thisProd,
        review: req.body,
        date: new Date()
    })
    }
});

//TODO: Single product Info page
module.exports = router;
