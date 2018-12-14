const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.products;
const user = data.users;
const payment = data.payment;
const neworder = data.orders;


router.get("/:id", async (req, res) => {
    var allProd = await productData.getAllProd();
    var frontPageProd = allProd.slice(0,3);
    if(typeof req.cookies.AuthCookie === 'undefined') {
        
        res.render('home', {products: frontPageProd, error: "Please Login!"});
    } else {
        
        var cookieUser = await user.getUserByEmail(req.cookies.AuthCookie);
        var userOrder = cookieUser.orders;
        if(userOrder.length === 0) {
            res.render('neworder', {user: cookieUser,  error: "No items in your shopping cart!"})
        }
        else{
            finishedOrders=[]
            for(var i = 0 ; i < userOrder.length; i++) {
                singleorder=await neworder.getOrderById(userOrder[i]);
                singleOrdersItems=[];
                orderItems= singleorder.items;
                for(var a = 0 ; a < orderItems.length; a++ ){
                    orderPro=await productData.getProdById(orderItems[a].toString());
                    console.log(orderPro);
                    singleOrdersItems.push(orderPro)
                }
                singleOrderPush={
                    _id: singleorder._id,
                    email: singleorder.user,
                    ItemsLists: singleOrdersItems,
                    date: singleorder.date,
                }
                finishedOrders.push(singleOrderPush);
            }
            res.render('neworder', { user: cookieUser, finishedOrders: finishedOrders});
        }
    }
    
 });

 router.get('/logout', (req, res) => {
    res.cookie("AuthCookie", "", {expires: new Date() });
    res.clearCookie("AuthCookie");
    res.render('logout', {title: 'logout'})
});

 module.exports = router;