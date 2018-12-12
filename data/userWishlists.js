const mongoCollection = require("../config/mongoCollections");
const users = mongoCollection.users;

let exportMethods = {

    // getAllWishItems
    getAllWishItems(userId) {
        return users().then(userCollection => {
            return userCollection.findOne({_id: userId}, {wishlists: 1}).then(cartInfo =>{
                return cartInfo;
            })

        })
            .catch(() => {
                return Promise.reject("Cannot get all items in cart");
            })
    },

    // addItemToWish
    addItemToWish(userId, productId) {
        return users().then(userCollection => {
            return userCollection.updateOne(
                {_id: userId},
                {
                    $push: {
                        wishlists: productId
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

    // deleteItemFromWish
    deleteItemFromWish(userId, productId) {
        return users().then(userCollection => {
            return userCollection.updateOne(
                { _id: userId},
                {
                    $pull: {
                        wishlists: productId
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

    // emptyWish
    emptyWish(userId) {
        return users().then(userCollection => {
            return userCollection.updateOne(
                { _id: userId},
                {$set: {
                        wishlists: []
                    }}
            ).then(() => {
                return this.getAllCartItems(userId);
            })
        })
    }
}
module.exports = exportMethods;