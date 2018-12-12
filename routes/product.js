const express = require("express");
const router = express.Router();
const data = require("../data");
const products = data.products;
const user = data.users;

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

router.get("/products/:title", async (req, res) => {

	var thisProd = await products.getProdByTitle(req.params.title);


	if(typeof req.cookies.AuthCookie === 'undefined') {
        
        res.render('products', {products: thisProd});

    } else {
        
        console.log(req.cookies.AuthCookie)
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
         console.log(thisProd);
        res.render('thisprod', {user: cookieUser, thisProd: thisProd});
    }

});


//TODO: Single product Info page
module.exports = router;
