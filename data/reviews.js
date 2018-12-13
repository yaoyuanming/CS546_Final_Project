/* Implementation for review DAO */
/*
    * Review basic API
        - getAllReviews
        - getReviewById
        - addNewReview
        - deleteReview
*/

const mongoCollection = require('../config/mongoCollections');
const reviews = mongoCollection.reviews;
const users = require('./users');
const products = require('./products');

let exportMethods = {
    //getAllReviews
    getAllReviews() {
        return reviews().then(reviewCollection => {
            return reviewCollection.find({}).toArray();
        })
    },

    //getReviewById
    getReviewById(id) {
        return reviews().then(reviewCollection => {
            return reviewCollection.findOne({_id: id}).then(review => {
                if (!review) throw "No review found";

                return review;
            })
        })
    },

    //addNewReview
    addReview(title, body, rating, userId, productId) {
        return reviews().then(reviewCollection => {
            return users.getUserById(userId).then(reviewer => {
                return products.getProdById(productId).then(reviewedProd => {
                    let newReview = {
                        title: title,
                        comment: body,
                        rating: rating, 
                        user: {
                            id: userId,
                            name: `${reviewer.firstname} ${reviewer.lastname}`
                        },
                        productId: productId,
                        date: new Date(),
                    };
                    return reviewCollection.insertOne(newReview)
                           .then(newInsertInfo => {
                               return newInsertInfo.insertedId;
                           })
                           .then(newId => {
                               return this.getReviewById(newId);
                           })
                })
            })
        })
    },

    deleteReview(id) {
        return reviews().then(reviewCollection => {
            return reviewCollection.removeOne({_id: id}).then(deletionInfo =>{
                if(deletionInfo.deletedCound === 0) {
                    throw `Could not delete review with id of ${id}`;
                } else {
                    // do nothing
                }
            })
        })
    },

    getReviewByProdId(id) {
        return reviews().then(reviewCollection => {
            return reviewCollection.find({productId: id}).toArray().then(reviews => {
                if (!reviews) throw  "No review found!"
                else return reviews;
            })
        })
    }


}

module.exports = exportMethods;
