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
                return Promise.reject("Cannot get all items in wish");
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
                return this.getAllWishItems(userId);
            })



        })
            .catch(() => {
                return Promise.reject("Cannot add Item into wishlist");
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
                return this.getAllWishItems(userId);
            })
        })
            .catch(() => {
                return Promise.reject("Cannot delete Item from wish")
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
                return this.getAllWishItems(userId);
            })
        })
    }
}
module.exports = exportMethods;