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

   const newProd = await products.addProd("testProd", "This is the description for testProd, perfect for testing purpose", "food", "1.2", "1");
   //console.log(newProd);
   //console.log("second")
   const newPord2 = await products.addProd("prod2", "This is the description for prod2, but good as testProd but still fine", "anytype", "888", "2");
   const newPord3 = await products.addProd("prod3", "This is the description for prod3, but good as testProd but still fine", "anytype", "321", "2");
   const newPord4 = await products.addProd("prod4", "This is the description for prod4, but good as testProd but still fine", "anytype", "45", "2");
   const newPord5 = await products.addProd("prod5", "This is the description for prod5, but good as testProd but still fine", "anytype", "2.5", "2");
   const newPord6 = await products.addProd("prod6", "This is the description for prod6, but good as testProd but still fine", "anytype", "7", "2");
   const newPord7 = await products.addProd("prod7", "This is the description for prod7, but good as testProd but still fine", "anytype", "99", "2");
   const newPord8 = await products.addProd("prod8", "This is the description for prod8, but good as testProd but still fine", "anytype", "99.98", "2");
   

    const newUser = await users.addNewUser("YD", "Li", "123@abc.com");
    //console.log(newUser);
    


    

    
}

main();