/* Implementation for User Credentials */
/*   
    basic API: 
        - getCredentialByEamil
        - comparePassword
        - createNewCredential
        - updateCredential
*/

const mongoCollection = require('../config/mongoCollections');
const credentials = mongoCollection.credential;
const bcrypt = require('bcrypt');



async function generateHash(password) {
    const hash = await bcrypt.hashSync(password, 10);
    return hash;
}

let exportedMethods = {
    // getCredentialByEmail
    getCredentialByEamil(email) {
        return credentials().then(credentialCollection => {
            return credentialCollection.findOne({_id: email}, {_id:1, password:1}).then(cre => {
                console.log("cre.password");
                console.log(cre.password);
                if (cre.password === null) {
                    
                    Promise.reject("not registered!")
                } else {
                    return cre;
                }
            })
        })
        .catch(() => {
            return Promise.reject(`Cannot find credential for email ${email}` );
        })
    },

    //compare
    async comparePassword(email, password) {
        const credentialCollection = await credentials();
        
        
        const cre = await credentialCollection.findOne({_id: email}, {_id:1, password: 1});
        if(!cre) {
            return undefined;
        }
        else if (bcrypt.compareSync(password, cre.password)) {
            return Promise.resolve("Password Machted");
        } else {
            Promise.reject("Incorrect Password");
            return undefined;
        }
    },

    //createNewCredential
    async createNewCredential(email, pwd) {
        const credentialCollection = await credentials();
        const hash = await generateHash(pwd);
        let newCre = {
            _id: email,
            password: hash
        };
        const insertedInfo = await credentialCollection.insertOne(newCre);

        const cre = this.getCredentialByEamil(email);
        return cre;
    },

    //update Credential
    async updateCredential(email, newPassword) {
        const credentialCollection = await credentials();
        const newHash = await generateHash(newPassword);
        const updatedData = {
            _id: email,
            password: newHash
        };

        credentialCollection.updateOne(
            {_id: email},
            {
                $set: updatedData
            }
        )
        return await this.getCredentialByEamil(email);
    }
    
}

module.exports = exportedMethods;