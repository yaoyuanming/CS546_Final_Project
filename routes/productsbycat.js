const express = require("express");
const router = express.Router();
const data = require("../data");
const products = data.products;
const user = data.users;

//category included: shoes, hoodie, pants, hat, accessories,
router.get("/hoodie", async (req, res) => {

	// console.log("testing");
    var hoodieProd = await products.getProdByCat("hoodie");
    // console.log(thisProd);
    if(typeof req.cookies.AuthCookie === 'undefined') {
        res.render('products', {products: hoodieProd});
    } else {
        // console.log(req.cookies.AuthCookie)
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        res.render('products', {products: hoodieProd, user: cookieUser});
    } 
});

router.get("/shoes", async (req, res) => {

    // console.log("testing");
    var shoesProd = await products.getProdByCat("shoes");
    // console.log(thisProd);
    if(typeof req.cookies.AuthCookie === 'undefined') {
        res.render('products', {products: shoesProd});
    } else {
        // console.log(req.cookies.AuthCookie)
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        res.render('products', {products: shoesProd, user: cookieUser});
    } 
});

router.get("/pants", async (req, res) => {

    // console.log("testing");
    var pantsProd = await products.getProdByCat("pants");
    // console.log(thisProd);
    if(typeof req.cookies.AuthCookie === 'undefined') {
        res.render('products', {products: pantsProd});
    } else {
        // console.log(req.cookies.AuthCookie)
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        res.render('products', {products: pantsProd, user: cookieUser});
    } 
});

router.get("/hat", async (req, res) => {

    // console.log("testing");
    var hatProd = await products.getProdByCat("hat");
    // console.log(thisProd);
    if(typeof req.cookies.AuthCookie === 'undefined') {
        res.render('products', {products: hatProd});
    } else {
        // console.log(req.cookies.AuthCookie)
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        res.render('products', {products: hatProd, user: cookieUser});
    } 
});

router.get("/accessories", async (req, res) => {

    // console.log("testing");
    var accessoriesProd = await products.getProdByCat("accessories");
    // console.log(thisProd);
    if(typeof req.cookies.AuthCookie === 'undefined') {
        res.render('products', {products: accessoriesProd});
    } else {
        // console.log(req.cookies.AuthCookie)
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        res.render('products', {products: accessoriesProd, user: cookieUser});
    } 
});


//TODO: Single product Info page
module.exports = router;