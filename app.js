// import modules
let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

// import config
var config = require('./config');

// import subroutes
let users = require('./routes/users');
let index = require('./routes/index');

// initialize the app
let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.json({ message: 'API Initialized!'});
});

// routes available publicly
app.use('/', index);

// routes for signed in user
app.use('/user', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = config.env === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: err});
  console.log(err);
});

module.exports = app;
