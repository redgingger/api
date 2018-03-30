var express = require('express');
var router = express.Router();

var Customer = require('../db/models/index').Customer;

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
 * Get user by its ID
 */
router.get('/:uId', (req, res, next) => {
  res.json(req.user);
});


module.exports = router;
