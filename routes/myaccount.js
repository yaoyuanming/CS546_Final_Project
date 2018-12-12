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
            console.log(cookieUser);
            res.render('myaccount', { user: cookieUser });
        }
    // })
});

router.get('/logout', (req, res) => {
    res.cookie("AuthCookie", "", {expires: new Date() });
    res.clearCookie("AuthCookie");
    res.render('logout', {title: 'logout'})
});



router.get("/wishlist", (req, res) => {
    res.render('wishlist');
})

router.get("/cart", (req, res) => {
    res.render('cart');
})

module.exports = router;