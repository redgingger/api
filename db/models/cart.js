const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CartSchema = new Schema({
  product: {type: Schema.Types.ObjectId, ref:'Product'},
  quantity: {
      type: Number,
      min: 1,
      default: 1
  },
  updated_at: {type: Date, default: Date.now},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

let Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
