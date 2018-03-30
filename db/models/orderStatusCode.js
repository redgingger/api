const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let OrderStatusSchema = new Schema({
  status_code: Number,
  status_name: String
});

let OrderStatusCode = mongoose.model("OrderStatusCode", OrderStatusSchema);

module.exports = OrderStatusCode;
