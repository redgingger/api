var Customer = require('../db/models/index').Customer;
var Product = require('../db/models/index').Product;
var Cart = require('../db/models/index').Cart;
var Orders = require('../db/models/index').Order;
var Shipment = require('../db/models/index').Shipment;

var ProductController = require('./ProductController')
var CustomerController = require('./CustomerController')

let checkoutOrders = (orders, user, coupon) => {
  let s = new Shipment({
    shipment_type: "Cash on delivery",
    coupon: coupon ? coupon : null
  });

  return ProductController.productExists(orders[0].product)
    .then(doc => {

      if (doc) {
        s.save((err, shpmnt) => {
          if (err) return next(err);
          for (let i = 0; i < orders.length; i++) {
            if (ProductController.productExists(orders[i].product)) {
              _product_exist = true;
              let order = new Orders({
                product: orders[i].product,
                quantity: orders[i].quantity,
                status: null,
                shipment: s._id,
                customer: user,
              })
              order.save((err, ord) => {
                CustomerController.addToOrderHistory(ord._id, user);
              });
            }
          }
        });
      }

      return doc;

    });


};

module.exports = {
  checkoutOrders
}
