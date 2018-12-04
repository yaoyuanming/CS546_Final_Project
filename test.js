//Test for product

const connection = require('./config/mongoConnection');
const products = require('./data/products');
const reviews = require('./data/reviews');
const users = require('./data/users');
const userCart = require('./data/userCart');
const credential = require('./data/userCredentials');

async function main() {
   const db = await connection();
   await db.dropDatabase();

   const newProd = await products.addProd("testProd", "des", "food", "1.2", "1");
   //console.log(newProd);
   //console.log("second")
   const newPord2 = await products.addProd("prod2", "des2", "anytype", "888", "2");


    const newUser = await users.addNewUser("YD", "Li", "123@abc.com");
    //console.log(newUser);
    const addItemToCart = await userCart.addItemToCart(newUser._id, newProd._id);
    console.log("adding item to cart: ")
    console.log(await users.getUserById(newUser._id));
    const allItemInCart = await userCart.getAllCartItems(newUser._id);
    console.log("getting all items");
    console.log(allItemInCart);
    const add2 = await userCart.addItemToCart(newUser._id, newPord2._id);
    console.log(await users.getUserById(newUser._id))
    console.log("******* Deleting All *******");

    const del1 = await userCart.emptyCart(newUser._id)
    console.log(await users.getUserById(newUser._id))

    console.log("*************** Credential ****************");
    const userCre = await credential.createNewCredential(newUser.email, "112233");
    const pwd = await credential.getCredentialByEamil(newUser.email);
    console.log(userCre)

    
    console.log("*** Password: ***");
    const compareResult = await credential.comparePassword(newUser.email, "112233");
    console.log(compareResult);

    const update = await credential.updateCredential(newUser.email, "223344");
    console.log(update)

    const compareResult2 = await credential.comparePassword(newUser.email, "223344");
    console.log(compareResult2);

    
    

    
}

main();