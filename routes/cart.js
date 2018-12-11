const express = require("express");
const router = express.Router();
const data = require("../data");
const user = data.users;
const productData = data.products;

router.get("/", async (req, res) => {
    var allProd = await productData.getAllProd();
    var frontPageProd = allProd.slice(0,3);
    if(typeof req.cookies.AuthCookie === 'undefined') {
        
        res.render('home', {products: frontPageProd});
    } else {
        
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        res.render('cart', { user: cookieUser});
    }
});



module.exports = router;