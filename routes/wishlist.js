const express = require("express");
const router = express.Router();
const data = require("../data");
const users = data.users;

router.get("/", (req, res) => {
    // user.getUserById(id).then(user=>{
    	res.render('wishlist', {
            // user: allProd
        })
    // })
    

});



module.exports = router;