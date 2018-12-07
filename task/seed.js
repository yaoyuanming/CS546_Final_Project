const connection = require('../config/mongoConnection');
const products = require('../data/products');
const reviews = require('../data/reviews');
const users = require('../data/users');
const userCart = require('../data/userCart');
const credential = require('../data/userCredentials');
const order = require('../data/orders'); 
const payment = require('../data/payment');



async function main() {
   const db = await connection();
   await db.dropDatabase();

   const newProd = await products.addProd("testProd", "des", "food", "1.2", "1");
   //console.log(newProd);
   //console.log("second")
   const newPord2 = await products.addProd("prod2", "des2", "anytype", "888", "2");


    const newUser = await users.addNewUser("YD", "Li", "123@abc.com");
    //console.log(newUser);
    


    

    
}

main();