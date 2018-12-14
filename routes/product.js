const express = require("express");
const router = express.Router();
const data = require("../data");
const products = data.products;
const user = data.users;
const reviewData = data.reviews;




router.get("/products", async (req, res) => {
    var allProd = await products.getAllProd();
    
    if(typeof req.cookies.AuthCookie === 'undefined') {
        
        res.render('products', {products: allProd});
    } else {
        
        console.log(req.cookies.AuthCookie)
        cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        res.render('products', {products: allProd, user: cookieUser});
    }
});

var singleprod;
var cookieUser; 

router.get("/products/:id", async (req, res) => {
     singleprod = await products.getProdById(req.params.id);
    //console.log(req.params.id)
    //console.log(req.params.id)
    var reviewForProd = await reviewData.getReviewByProdId(singleprod._id);
    console.log("cookieUser");
    if(typeof req.cookies.AuthCookie === 'undefined') {
        
        res.render('thisprod', {thisProd: singleprod, reviews:reviewForProd});
    } else {
        cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        res.render('thisprod', {thisProd: singleprod, reviews:reviewForProd, user: cookieUser})
        
    }
});

router.post("/products/reviews",async (req, res) => {
    
    var newRev = await reviewData.addReview(req.body.title, req.body.review, req.body.rating, cookieUser._id, singleprod._id);
    //console.log(newRev);
    var revtouser = await user.addReviewToUser(cookieUser._id, newRev._id, newRev.title);
    console.log(newRev._id);;
    var revtoprod = await products.addReviewToProd(singleprod._id, newRev._id, newRev.title);
    console.log("testing123123")
    res.json({
        user: cookieUser,
        product: singleprod,
        review: req.body,
        date: new Date()
    })
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


    






//TODO: Single product Info page
module.exports = router;