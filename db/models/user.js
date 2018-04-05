const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
let Schema = mongoose.Schema;

let CartSchema = require('./cart');

let CustomerSchema = new Schema({
  first_name: {
      type: String,
      required: true
  },
  last_name: {
      type: String,
      required: true
  },
  email: {
      type: String,
      validate: {
          validator: function (v) {
              return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
          }
      },
      required: true
  },
  password: {
      type: String,
      required: true
  },
  phone_no: {
      type: Number,
      required: true,
      validate: {
          validator: function (v) {
              return /^[6-9]\d{9}$/.test(v)
          },
          message: '{value} is not a valid mobile number!'
      }
  },
  joined_at: {type: Date, default: Date.now},
  address_line_1: {type: String, default: null},
  address_line_2: {type: String, default: null},
  town_or_city: {type: String, default: null},
  country: {type: String, default: null},
  order_history: [{type: Schema.Types.ObjectId, ref:'Order'}],
  is_admin: {type: Boolean, default: false},
  wishlist: { type: [Schema.Types.ObjectId], ref: 'Products' }
});

// CustomerSchema.methods.encryptPassword = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
// };

// CustomerSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };

let Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
