const express = require("express");
const router = express.Router();
const data = require("../data");
const user = data.users;
const productData = data.products;
const fs = require("fs");
const formidable = require("formidable");

var cookeiUser;
var image = false;
router.get("/:id", async (req, res) => {
    	var allProd = await productData.getAllProd();
        var frontPageProd = allProd.slice(0,3);
        if(typeof req.cookies.AuthCookie === 'undefined') {
            
            res.render('home', {products: frontPageProd});
        } else {
            
             cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
            console.log(cookieUser);
            res.render('myaccount', { user: cookieUser, image: image });
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

router.get("/order", (req, res) => {
    res.render('neworder');
})
router.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(req, function(error, fields, files) {
        console.log("parsing done");
        fs.writeFileSync(`public/img/${cookieUser.email}-image.jpg`, fs.readFileSync(files.upload.path));
// res.redirect("/views/upload.handlebars") ;
    });
    image = true;
    res.render('myaccount', {user: cookieUser, image: image})
});
module.exports = router;