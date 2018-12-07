const express = require('express');
const router = express.Router();
const data = require("../data");
const productData = data.products;

router.get("/", (req, res) => {
    productData.getAllProd().then(allProdcuts => {
        console.log(allProdcuts);
        res.render('home', {
            //user: req.user,
            products: allProdcuts
        })
    })
    .catch((err) => {
        res.send(err);
    })
})
module.exports = router;
