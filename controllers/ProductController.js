var Customer = require('../db/models/index').Customer;
var Product = require('../db/models/index').Product;
var Cart = require('../db/models/index').Cart;
var Orders = require('../db/models/index').Order;
var Shipment = require('../db/models/index').Shipment;

/**
 * Check if a product exists
 * @param {ObjectID} id ProductID
 */
function productExists(id) {
  var exists = false;
  let q = Product.findById(id);
  return q.then(doc => {
    if (doc) return true
    else return false;
  });
}

module.exports = {
  productExists
}
