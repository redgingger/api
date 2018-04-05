var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var config = require('../config');

var Customer = require('../db/models/index').Customer;
var Product = require('../db/models/index').Product;

/* Get All Products. */
router.get('/products', function(req, res, next) {
  Product.find({})
    .exec((err, product) => {
      if (err) next(err);
      res.json(product);
    });
});

/**
 * Add User
 */
router.post('/register', (req, res, next)=> {
  var c = {...req.body};
  c.password = bcrypt.hashSync(c.password, bcrypt.genSaltSync(8), null);
  let customer = new Customer(c);
  customer.save((err, user) => {
    if (err) return res.status(500).json({message: "There was a problem registering the user."});

    // if user is registered without errors
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 864000 // expires in 10days
    });

    res.status(200).json({ auth: true, token: token });
  });
});

router.post('/login', (req, res, next) => {
  Customer.findOne({email: req.body.email})
    .exec((err, user) => {
      if (err) return next(err);

      // if user not found
      if (!user) {
        return res.status(404).json({message: "Username or Password is incorrect."});
      }

      // check password
      var passwordValidity = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordValidity) return res.status(401).json({auth: false, token: null});

      // if username and password is valid
      var token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 864000
      });

      res.status(200).json({auth: true, token: token})
    });
});


router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});


module.exports = router;
