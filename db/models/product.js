const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ReviewSchema = new Schema({
    text: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Customer' ,
        required: true
    }
})


let ProductSchema = new Schema({
  url: String,
  product_type: {type: Schema.Types.ObjectId, ref:'ProductCategory'},
  name: {
      type: String,
      required: [true, 'Product name is required!']
  },
  images: Array,
  actual_price: {
      type: Number,
      required: true,
  },
  percent_off: {
      type: Number,
      required: true
  },
  sale_price: {
      type: Number,
      required: true
  },
  size: String,
  description: String,
  man_details: Array,
  created_at: {type: Date, default: Date.now},
  reviews: [ReviewSchema],
  is_deleted: {type: Boolean, default: false}
});

let Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
