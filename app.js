//Test for product

const connection = require('./config/mongoConnection');
const products = require('./data/products');

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
}

main();