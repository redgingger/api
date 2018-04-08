const mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Schema for Shipment
let ShipmentSchema = new Schema({
  shipment_date: {type: Date, default: null},
  shipment_type: String,
  coupon: {type: Schema.Types.ObjectId, ref:'Coupon', default:null},
  orderedOn: {type: Date, default: Date.now()}
});

// Schema for Orders
let OrderSchema = new Schema({
  product: {type: Schema.Types.ObjectId, ref: "Product"},
  status: {type: Schema.Types.ObjectId, ref: 'OrderStatusCode'},
  quantity: Number,
  shipment: {type: Schema.Types.ObjectId, ref:'Shipment'},
  customer: {type: Schema.Types.ObjectId, ref:'Customer'}
});

let Order = mongoose.model("Order", OrderSchema);
let Shipment = mongoose.model("Shipment", ShipmentSchema);


module.exports = {Order, Shipment};
