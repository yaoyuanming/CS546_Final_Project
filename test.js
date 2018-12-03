//Test for product

const connection = require('./config/mongoConnection');
const products = require('./data/products');
const reviews = require('./data/reviews');
const users = require('./data/users');

async function main() {
   const db = await connection();
   await db.dropDatabase();

   const newProd = await products.addProd("testProd", "des", "food", "1.2", "1");
   console.log(newProd);
   //console.log("second")
   const newPord2 = await products.addProd("prod2", "des2", "anytype", "888", "2");
    //console.log("testing")
   const byid = await products.getProdById(newProd._id);
   //console.log("testing")
    //console.log(byid);

    const allProd = await products.getAllProd();
    console.log(allProd);

    const delProd = await products.deleteProd(newProd._id);
    //console.log("deleted");
    //const del = await products.getProdById(newProd._id);
    //console.log("testing")

    const newUser = await users.addNewUser("YD", "Li", "123@abc.com");
    console.log(newUser);

    const newReview = await reviews.addReview("testtitle", "this is the comment", 5, newUser._id, newPord2._id);
    console.log(newReview);
    const addeduser = await users.addReviewToUser(newUser._id, newReview._id, "testtitle");
    console.log(addeduser);
    //products.addReviewToProd(newPord2._id, newReview._id, "testtitle");
    //console.log(newPord2);
    const reviewId = await reviews.getReviewById(addeduser.reviews[0].id);
    console.log(reviewId);

    
}

main();