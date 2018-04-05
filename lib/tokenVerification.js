var jwt = require('jsonwebtoken');
var config = require('../config');

var Customer = require('../db/models/index').Customer;

function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).json({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
}

function verifyAdmin(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).json({ auth: false, message: 'No token provided.' });

  // verifies secret and checks exp
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;

    Customer.findById(decoded.id)
      .exec((err, user) => {
        if (err) res.status(500).json({ auth: false, message: 'Failed to find user' });
        if (!user.is_admin) {
          res.status(406).json({auth: false})
        }
      })

    next();
  });
}

module.exports = {verifyToken, verifyAdmin};
