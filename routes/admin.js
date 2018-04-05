var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var config = require('../config');

var Customer = require('../db/models/index').Customer;
var Product = require('../db/models/index').Product;

const f = require('../functions');

var tokenVerification = require('../lib/tokenVerification');


/**
 * Verify Admin
 */
router.use((req, res, next) => {
  return tokenVerification.verifyAdmin(req, res, next);
})

/**
 * Execute if User ID is present in request
 */
router.param("uId", (req, res, next, id) => {
  Customer.findById(req.params.uId)
          .exec((err, user) => {
              if (err) return next(err);
              // If user not found in database return an 404 Error
              if (!user) {
                  err = new Error("Not Found");
                  err.status = 404;
                  return next(err);
              }
              // set the user
              req.user = user;
              return next()
          });
});

/**
* Execute if Product ID is present in request
*/
router.param("pId", (req, res, next, id) => {
  Product.findById(req.params.pId)
          .exec((err, product) => {
              if (err) return next(err);
              // If product not found in database return an 404 Error
              if (!product) {
                  err = new Error("Not Found");
                  err.status = 404;
                  return next(err);
              }
              // set the product
              req.product = product;
              return next();
          });
});


/**
* Get all users
*/
router.get('/users', (req, res, next) => {
  Customer.find({})
      .sort({joined_at: -1})
      .exec((err, products) => {
        if (err) return next(err);
        res.json(products);
      });
});

/**
* Get user by its id
*/
router.get('/users/:uId', (req, res, next) => {
  res.json(req.user);
});

/**
* Add product
*/
router.post("/products", (req, res, next) => {
  let url = f.slugify(req.body.name);
  req.body.url = url;
  let product = new Product(req.body);
  product.save((err, product) => {
      if (err) return next(err);
      res.status(201);
      res.json(product);
  });
});

/**
* Get the product by its id
*/
router.get('/products/:pId', (req, res, next) => {
  res.json(req.product);
});


module.exports = router;
