/* Implementation for orders DAO */

/*
    basic API: 
        - getOrderById
        - getOrderByEmail
        - createNewOrder
        - addPaymentToOrder
        - Deletion and Update of orders are not allowed
*/

const mongoCollections = require('../config/mongoCollections');
const orders = mongoCollections.orders;
const uuid = require('uuid')

let exportMethods = {
    //gerOrderById
    getOrderById(id) {
        return orders().then(orderCollection => {
            return orderCollection.findOne({_id: id});
        })
        .catch(() => {
            return Promise.reject("No orders found");
        })
    },

    //getOrderByEmail
    getOrderByEmail(email) {
        return orders().then(orderCollection => {
            return orderCollection.find({user: email}).toArray();
        })
        .catch(() => {
            return Promise.reject(`Error when retrieving orders for user with email ${email}`);
        })
    },

    createNewOrder(email, cartItems) {
        return orders().then(orderCollection => {
            let newOrder = {
                _id: uuid.v4(),
                user: email,
                items: cartItems,
                payment: {},
                date: new Date()
            };
            return orderCollection.insertOne(newOrder)
                   .then(newOrderInfo => {
                       return newOrderInfo.insertedId;
                   }).then(() => {
                       return this.getOrderById(newOrder._id);
                   })
        })
        .catch(() => {
            return Promise.reject("Cannot create new order");
        })
    },

    //addPaymentToOrder
    addPaymentToOrder(payment, orderId) {
        // TODO
        return orders().then(orderCollection => {
            return orderCollection.updateOne(
                {_id: orderId},
                {
                    $set: {
                        payment: payment
                    }
                }
            ).then(updatedInfo => {
                return this.getOrderById(orderId);
            })
        })
        .catch(() => {
            return Promise.reject("Error when adding Payment to Order");
        })
    }
}

module.exports = exportMethods;