/*
    Implementation for user DAO.
*/ 
/*
    part I: user
    part II: shopping cart
    part III: wishlists
    part IV: reviews
    part IV: credential

*/ 

const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const uuid = require('node-uuid');


function generateHashedPassword(password) {
    return bcrypt.hashSync(password, 10);
}


let exportMethods = {

    /* Part I */

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
            return userCollection.findOne({_id: id}).then(user => {
                if (!user) throw "User not found";

                return user;
            });

        });
    },

    //addNewUser
    addNewUser(firstname, lastname, email, password) {
        return users().then(userCollection => {
            let newUser = {
                _id: uuid.v4(),
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: generateHashedPassword(password),
                wishlists: [],
                cart:[],
                reviews: []
            };

            return userCollection.insertOne(newUser)
                                 .then(InsertedUser => {
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
                password: updatedUser.password
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

    //addReview

    



    
    
}