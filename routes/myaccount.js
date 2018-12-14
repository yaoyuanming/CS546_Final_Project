const express = require("express");
const router = express.Router();
const data = require("../data");
const user = data.users;
const productData = data.products;
const fs = require("fs");
const formidable = require("formidable");



var cookieUser;
var image;
router.get("/:id", async (req, res) => {
    	var allProd = await productData.getAllProd();
        var frontPageProd = allProd.slice(0,3);
        if(typeof req.cookies.AuthCookie === 'undefined') {
            
            res.render('home', {products: frontPageProd});
        } else {

             cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
            var imagecheck= cookieUser.image;
            imagecheck= cookieUser.image;



            if(!imagecheck) res.render('myaccount', {user: cookieUser});
            else res.render('myaccount', { user: cookieUser, image: imagecheck });
        }
});



router.post('/upload', async function (req, res) {
    var form = new formidable.IncomingForm();
    
    console.log("about to parse");
    form.parse(req, function(error, fields, files) {
        console.log("parsing done");
        fs.writeFileSync(`public/img/${cookieUser.email}-image.jpg`, fs.readFileSync(files.upload.path));
      //  res.redirect("/views/upload.handlebars") ;
    });
    var update = await user.updateUserImage(cookieUser._id);
    console.log(cookieUser);
    //image = true;
    var imagecheck = cookieUser.image;
    res.redirect("/myaccount/"+cookieUser._id.toString())
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

module.exports = router;