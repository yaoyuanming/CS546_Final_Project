const dbConnection = require("./mongoConnection");


let getCollectionFn = collection => {
  let _col = undefined;

  return () => {
    if (!_col) {
      _col = dbConnection().then(db => {
        return db.collection(collection);
      });
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
module.exports = {
  users: getCollectionFn("users"),
  products: getCollectionFn("products"),
  reviews: getCollectionFn("reviews"),
  orders: getCollectionFn("orders"),
  payment: getCollectionFn("payment"),
  credential: getCollectionFn("credential"),
};
