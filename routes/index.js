var express = require('express');
var router = express.Router();

var Customer = require('../db/models/index').Customer;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({});
});

/**
 * Add User
 */
router.post('/users', (req, res, next)=> {
  let customer = new Customer(req.body);
  customer.save((err, customer) => {
    if (err) return next(err);
    res.status(201);
    res.json(customer);
  });
});


module.exports = router;
