const express = require('express');
const router = express.Router();
const data = require("../data");
const productData = data.products;
const credentialData = data.credentials;
const user = data.users;

router.get("/home", async (req, res) => {
    var allProd = await productData.getAllProd();
    var frontPageProd = allProd.slice(0,3);
    console.log("Testing")
    if(typeof req.cookies.AuthCookie === 'undefined') {
        console.log("Testing2")
        
        res.render('home', {products: frontPageProd});
    } else {
        
        console.log(req.cookies.AuthCookie)
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        res.render('home', {products: frontPageProd, user: cookieUser});
    }
});



router.post('/home', async (req, res) => {
    const username = req.body.loginEmail;
    const password = req.body.password;
    console.log(username);
    var authenticated = await credentialData.comparePassword(username, password);
    var loginUser = await user.getUserByEmail(username);
    console.log(authenticated);
    if(authenticated) {
        console.log("authenticated");

        res.cookie("AuthCookie", req.body.loginEmail);
    
        res.render('private', {
            user: loginUser
        })
    } else {
        res.render('home', { error: "Invalid email or password" })
    }
});

router.get('/logout', (req, res) => {
    res.cookie("AuthCookie", "", {expires: new Date() });
    res.clearCookie("AuthCookie");
    res.render('logout', {title: 'logout'})
});


module.exports = router;
