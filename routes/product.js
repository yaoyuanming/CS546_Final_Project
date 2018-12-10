const express = require("express");
const router = express.Router();
const data = require("../data");
const products = data.products;

router.get("/", (req, res) => {
    products.getAllProd().then(allProd => {
        res.render('products', {
            products: allProd
        })
    })
    
})


//TODO: Single product Info page
module.exports = router;