const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Schema for Shipment
let ShipmentSchema = new Schema({
  shipment_id: Number,
  invoice_number: String,
  shipment_date: Date,
  shipment_type: String
});

// Schema for Orders
let OrderSchema = new Schema({
  product: {type: Schema.Types.ObjectId, ref: "Product"},
  status: {type: Schema.Types.ObjectId, ref: 'OrderStatusCode'},
  quantity: Number,
  shipment: [ShipmentSchema],
  customer: {type: Schema.Types.ObjectId, ref:'Customer'}
});

let Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
