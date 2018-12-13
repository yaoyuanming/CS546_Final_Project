const connection = require('../config/mongoConnection');
const products = require('../data/products');
const reviews = require('../data/reviews');
const users = require('../data/users');
const userCart = require('../data/userCart');
const credential = require('../data/userCredentials');
const order = require('../data/orders'); 
const payment = require('../data/payment');
const wish = require('../data/userWishlists');

//    //category included: shoes, hoodie, pants, hat, accessories,
// //
async function main1() {

  const db = await connection();

   await db.dropDatabase();

  const airmax = await products.addProd("airmax", "One of the ugly shoes from Nike", "shoes", "332", "5");
   //console.log(newProd);
   //console.log("second")
  const aj11 = await products.addProd("aj11", "One of the most popular shoes", "shoes", "280", "22");
  const bape = await products.addProd("bape", "A hoodie from bathing ape", "hoodie", "45", "2");
  const banie = await products.addProd("beanie", "This is a blue hat", "hat", "14", "2");
  const camphat = await products.addProd("camphat", "This is a camphat", "hat", "74", "25");
  const coinbag = await products.addProd("coinbag", "This is a coinbag", "accessories", "123", "26");
  const handwarmer = await products.addProd("handwarmer", "This is a blue handwarmer", "accessories", "6", "25");
  //const kaws = await products.addProd("kaws", "This is a kaws toy", "accessories", "567", "23");
  const keychain = await products.addProd("keychain", "This is a keychain", "accessories", "3", "2");
  //const  = await products.addProd("", "", "", "", "");
  const kith = await products.addProd("kith", "A tshirt from kith", "hoodie", "18", "6");
  const metallic = await products.addProd("metallic", "A whatever from supreme", "hoodie", "633", "22");
  const nike = await products.addProd("nike", "a shoes from nike", "shoes", "33", "77");
  const palace = await products.addProd("palace", "A hoodie from palace", "hoodie", "37", "18");
  const photobook = await products.addProd("photobook", "A supreme photobook", "accessories", "63", "12");
  const shoulderbags = await products.addProd("shoulderbags", "A shoulderbags", "accessories", "56", "33");
  const skateboard = await products.addProd("skateboard", "This is a skateboard", "accessories", "124", "4");
  const slimpants = await products.addProd("slimpants", "This is a slimpants", "pants", "23", "1");
  const sportsbag = await products.addProd("sportsbag", "This is a sportsbag", "accessories", "37", "9");
  const supreme = await products.addProd("supreme", "This is a supreme hoodie", "hoodie", "200", "12");
  const trackpants = await products.addProd("trackpants", "This is a trackpants", "pants", "28", "19");
  const vapormax = await products.addProd("vapormax", "This is a shoes", "shoes", "239", "8");
  const yeezy350 = await products.addProd("yeezy350", "This is a yeezy350", "shoes", "270", "12");


  const newUser = await users.addNewUser("YD", "Li", "123@abc.com");
    //console.log(newUser);
  const testCre = await credential.createNewCredential("123@abc.com", "password");

  const review = await reviews.addReview("test", "This is a testing review", 3, newUser._id, kith._id);
  const addrevewtokith = await products.addReviewToProd(kith._id, review._id);
  console.log(await reviews.getReviewByProdId(kith._id));

  const review2 = await reviews.addReview("test2", "This is a testing review2", 3, newUser._id, kith._id);
  const addrevewtokith2 = await products.addReviewToProd(kith._id, review2._id);


}

main1();


