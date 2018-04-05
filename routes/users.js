var express = require('express');
var router = express.Router();

var Customer = require('../db/models/index').Customer;
var Product = require('../db/models/index').Product;
var Cart = require('../db/models/index').Cart;

var tokenVerification = require('../lib/tokenVerification');

router.use((req, res, next) => {
  return tokenVerification.verifyToken(req, res, next);
});

/**
 * get user details
 */
router.get('/profile', (req, res, next) => {
  var c = Customer.findById(req.userId)
    .exec((err, user) => {
      if (err) res.status(500).json({ message: 'unable to find user.' });
      res.json({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_no: user.phone_no,
        wishlist: user.wishlist,
        is_admin: user.is_admin,
        address_line_1: user.address_line_1,
        address_line_2: user.address_line_2,
        town_or_city: user.town_or_city,
        country: user.country,
        order_history: user.order_history,
      });
    })
});

/**
 * Add Item to cart
 */
router.post('/cart', (req, res, next) => {
  // Check if product exists
  Product.findById(req.body.product)
    .exec((err, product) => {
      if (err) next(err);
      if (product) {
        let query = Cart.findOne({ 'product': product._id, user: req.userId });
          query.exec((err, cart) => {
            if (err) next(err);
            // product already in cart
            if (cart) {
              cart.quantity++;
              cart.save((err, c) => {
                if (err) return next(err);
                c.product = product;
                res.json(c);
              });
            }
            // product not in cart
            else {
              let c = new Cart({
                user: req.userId,
                product: req.body.product
              });
              c.save((err, _cart) => {
                if (err) return next(err);
                res.status(201);
                _cart.product = product;
                res.json(_cart);
              });
            }
          })
      } else {
        res.status(404);
        res.json({error: {
          message: 'Product not found'
        }});
      }
    });

});

/**
 * get cart
 */
router.get('/cart', (req, res, next) => {
  Cart.find({user: req.userId})
    .exec((err, cart) => {
      if (err) return next(err);
      res.json(cart);
    })
});


module.exports = router;
