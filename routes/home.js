const express = require('express');
const router = express.Router();
const data = require("../data");
const productData = data.products;
const credentialData = data.credentials;

router.get("/", (req, res) => {
    productData.getAllProd().then(allProdcuts => {
        
        res.render('home', {
            //user: req.user,
            products: allProdcuts.slice(0,3)
        })
    })
    .catch((err) => {
        res.send(err);
    })
});

router.post('/', async (req, res) => {
    const username = req.body.loginEmail;
    const password = req.body.password;
    console.log(password);
    var authenticated = credentialData.comparePassword(username, password);
    if(authenticated) {

        res.cookie("AuthCookie", username);
        res.redirect('/home');
    } else {
        alert("error login")
        res.render('/home', { error: "Invalid email or password" })
    }
})
module.exports = router;
