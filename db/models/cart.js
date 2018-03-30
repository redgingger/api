const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CartSchema = new Schema({
  product: {type: String, ref:'Product'},
  quantity: {
      type: Number,
      min: 1
  },
  updated_at: {type: Date, default: Date.now}
});

module.exports = CartSchema;
