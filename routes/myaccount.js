const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

router.get("/", (req, res) => {
    // user.getUserById(id).then(user=>{
    	res.render('myaccount', {
            // user: allProd
        })
    // })
    

});

router.get("/wishlist", (req, res) => {
    res.render('wishlist');
})



module.exports = router;