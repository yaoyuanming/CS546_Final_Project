/* Implementation for payment DAO */

/*  
    basic API:
        - getPaymentById
        - addPayment
        - getPaymentByOrderId
*/

const mongoCollections = require('../config/mongoCollections');
const payments = mongoCollections.payment;

let exportedMethods = {
    //addPayment
    addPayment(card_No, orderId) {
        return payments().then(paymentCollection => {
            let newPayment = {
                card: card_No,
                order_id: orderId,
                date: new Date()
            };
            return paymentCollection.insertOne(newPayment).then(newInsertedInfo => {
                return newInsertedInfo.insertedId;
            }).then(() => {
                return this.getPaymentByOrderId(orderId);
            })
        })
        .catch(() => {
            return Promise.reject("Error when addidng payment")
        })
    },

    //getPaymentById
    getPaymentById(id) {
        return payments().then(paymentCollection => {
            return paymentCollection.findOne({ _id: id}).then(payment => {
                return payment;
            })
        })
        .catch(() => {
            return Promise.reject("Error when retrieving payment")
        })
    },

    //getPaymentByOrderId
    getPaymentByOrderId(orderId) {
        return payments().then(paymentCollection => {
            return paymentCollection.findOne({order_id: orderId}).then(payment => {
                return payment;
            })
        })
        .catch(() => {
            return Promise.reject(`Error when retrieving payment with order id ${orderId}`)
        })
    }
}

module.exports = exportedMethods;