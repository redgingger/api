const mongoose = require('mongoose');
let ID = mongoose.Schema.Types.ObjectId;

var Customer = require('../db/models/index').Customer;
var Product = require('../db/models/index').Product;
var Cart = require('../db/models/index').Cart;
var Orders = require('../db/models/index').Order;
var Shipment = require('../db/models/index').Shipment;

/**
 * Add orders to user history
 * @param {ID} order_id OrderID
 * @param {ID} user Customer ID
 */
function addToOrderHistory(order_id, user) {
  Customer.findById(user)
    .exec((err, customer) => {
      if (err) next(err);
      customer.order_history.push(order_id);
      customer.save((err, c) => {
        if (err) next(err);
      })
    });
}

module.exports = {
  addToOrderHistory
}
