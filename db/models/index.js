const mongoose = require('mongoose');
const config = require('../../config');

mongoose.connect(config.databse);

// Create an instance with current connection
let db = mongoose.connection;

// Handles Error
db.on("error", err => {
    console.error("Database Connection Error :", err);
});

// Log for connection
db.once("open", () => {
    console.log("Database Connection Successful");
});

let Customer = require('./user');
let Cart = require('./cart');
let ProductCategory = require('./category');
let Product = require('./product');
let {Order, Shipment} = require('./order');
let OrderStatusCodes = require('./orderStatusCode');

module.exports = {
    Customer,
    Product,
    Order,
    OrderStatusCodes,
    ProductCategory,
    Cart,
    Shipment
};
