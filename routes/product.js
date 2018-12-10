const express = require("express");
const router = express.Router();
const data = require("../data");
const products = data.products;

router.get("/products", async (req, res) => {
    var allProd = await productData.getAllProd();
    
    if(typeof req.cookies.AuthCookie === 'undefined') {
        
        res.render('products', {products: allProd});
    } else {
        
        console.log(req.cookies.AuthCookie)
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        res.render('products', {products: allProd, user: cookieUser});
    }
});




//TODO: Single product Info page
module.exports = router;