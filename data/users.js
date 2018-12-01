/*
    Implementation for user DAO.
*/ 
/*
    * user
        - getAllUsers
        - getUserById
        - addNewUser
        - deleteUser
        - UpdateUser
    * wishlists
        - addWishToUser
        - removeWishFromUser
    * reviews
        - TODO

*/ 

const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const uuid = require('node-uuid');




let exportMethods = {

    /* Users */

    //getAllUsers
    getAllUsers() {
        return users().then(userCollection => {
            return userCollection.find({}).toArray();
        });
    },
    
    //getUserById
    getUserById(id) {
        if (!id) throw "No ID provided!";

        return users().then(userCollection => {
            console.log(id)
            return userCollection.findOne({_id: id}).then(user => {
                if (!user) throw "User not found";
                //console.log(user)
                return user;
            });

        });
    },

    //addNewUser
    addNewUser(firstname, lastname, email) {
        return users().then(userCollection => {
            //console.log("testing")
            let newUser = {
                //_id: uuid.v4(),
                firstname: firstname,
                lastname: lastname,
                email: email,
                wishlists: [],
                cart:[],
                reviews: []
            };
            //console.log(newUser)

            return userCollection.insertOne(newUser)
                                 .then(InsertedUser => {
                                     //console.log("inserted")
                                     return InsertedUser.insertedId;
                                 }).then(newId => {
                                     return this.getUserById(newId);
                                 })
        });
    },

    //delete user
    deleteUser(id) {
        return users().then(userCollection => {
            return userCollection.removeOne({_id: id})
                   .then(deletedUser => {
                       if (deletedUser.deletedCount === 0) {
                           throw `Could not delete user with id of ${id}`;
                       }
                   });
        });

    },

    //update user
    updateUser(id, updatedUser) {
        return this.getUserById(id).then(currentUser => {
            let currentUser = {
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                email: updatedUser.email,
            };

            let updateCommand = {
                $set: updatedUser
            };

            return userCollection.updateOne({_id: id}, updateCommand)
                   .then(() => {
                       return getUserById(id);
                   })
        })
    },

    /* Wishlists */

    //addWishToUser
    addWishToUser(userId, productId, productTitle) {
        return this.getUserById(userId).then(currentUser => {
            return userCollection.updateOne(
                {
                    _id: id
                }, 
                {
                    $addToSet: {
                        wishlists: {
                            id: productId,
                            title: productTitle
                        }
                    }
                }
            )
        })
    },

    //removeWishFromUser
    removeWishFromUser(userId, productId) {
        return this.getUserById(userId).then(currentUser => {
            return userCollection.updateOne(
                {_id: id},
                {
                    $pull: {
                        wishlists: {
                            id: productId
                        }
                    }
                }
            )
        })
    },




    



    
    
}

module.exports = exportMethods;