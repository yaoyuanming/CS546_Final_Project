/* 
    Implementation for product DAO
*/

/*
    * products basic API
        - getAllProd
        - getProdById
        - addProd
        - deleteProd
        - updateProd
    * reviews
        - addReviewToProd
*/
const mongoCollection = require('../config/mongoCollections');
const products = mongoCollection.products;
//const uuid = require('uuid');

module.exports = {
    /* products */

    //getAllProd
    getAllProd() {
        return products().then(productCollection => {
            return productCollection.find({}).toArray();
        })
    },

    //getProdById
    getProdById(id) {
        if (!id) throw "No ID provided";

        return products().then(productCollection => {
            return productCollection.findOne({_id: id}).then(product => {
                if(!product) throw "no product found";
                //console.log(product)
                return product;
            })
        })
    },

    //addProd
    addProd(title, description ,category, price, quantity, image) {
        return products().then(productCollection => {
            let newProd = {
                //_id: uuid.v4(),
                title: title,
                description: description,
                category: category,
                price: price,
                quantity: quantity,
                rating: 0,
                image: image,
                reviews: []
            };
            return productCollection.insertOne(newProd)
                   .then(newInsertedProd => {
                       return newInsertedProd.insertedId;
                   })
                   .then(newId => {
                       return this.getProdById(newId);
                   })
        })
    },

    //deleteProd
    deleteProd(id) {
        return products().then(productCollection => {
            return productCollection.removeOne({_id: id}).then(deleteInfo => {
                
                if(deleteInfo.deletedCount === 0) {
                    throw "delete failed";
                } 
            })
        })
    },

    //updateProd
    updateProd(id, updatedProd) {
        return products().then(productCollection => {
            let updatedProdData = {};

            if (updatedProd.title) {
                updatedProdData.title = updatedProd.title;
            }
            if (updatedProd.descripiton) {
                updatedProdData.descripiton = updatedProd.descripiton;
            }
            if (updatedProd.category) {
                updatedProdData.category = updatedProd.category;
            }
            if (updatedProd.price) {
                updatedProdData.price = updatedProd.price;
            }
            if (updatedProd.quantity) {
                updatedProdData.quantity = updatedProd.quantity;
            }

            let updateCommand = {
                $set: updatedProdData
            }

            return productCollection.updateOne({_id: id}, updateCommand)
                   .then(result => {
                       return this.getProdById(id);
                   })
        })
    },

    /* Reveiws */
    
    //addReviewToProd
    addReviewToProd(productId, reviewId, reviewTitle) {
        return products().then(productCollection => {
            return productCollection.updateOne(
                { _id: productId },
                {
                    $addToSet: {
                        reviews: {
                            id: reviewId,
                            title: reviewTitle
                        }
                    }
                }

            )
        })
    },

    
    
}

