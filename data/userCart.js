/* Implementation for user's shopping cart */
/*
    userCart basic API
        - getAllCartItems
        - addItemToCart
        - deleteItemFromCart
        - emptyCart
*/

const mongoCollection = require("../config/mongoCollections");
const users = mongoCollection.users;

let exportMethods = {
    
    // getAllCartItems
    getAllCartItems(userId) {
        return users().then(userCollection => {
            return userCollection.findOne({_id: userId}, {cart: 1}).then(cartInfo =>{
                return cartInfo;
            })
            
        })
        .catch(() => {
            return Promise.reject("Cannot get all items in cart");
        })
    },

    // addItemToCart
    addItemToCart(userId, productId) {
        return users().then(userCollection => {
            return userCollection.updateOne(
                {_id: userId},
                {
                    $push: {
                        cart: productId
                    }
                }
                
            ).then(() => {
                return this.getAllCartItems(userId);
            })
                
            
                
        })
        .catch(() => {
            return Promise.reject("Cannot add Item into Cart");
        })
    },

    // deleteItemFromCart
    deleteItemFromCart(userId, productId) {
        return users().then(userCollection => {
            return userCollection.updateOne(
                { _id: userId},
                {
                    $pull: {
                        cart: productId
                    }
                }
            ).then(() =>{
                return this.getAllCartItems(userId);
            }) 
        })
        .catch(() => {
            return Promise.reject("Cannot delete Item from Cart")
        })
    },

    // emptyCart
    emptyCart(userId) {
        return users().then(userCollection => {
            return userCollection.updateOne(
                { _id: userId},
                {$set: {
                    cart: []   
                }}
            ).then(() => {
                return this.getAllCartItems(userId);
            })
        })
    }
}
module.exports = exportMethods;