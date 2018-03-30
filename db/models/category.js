const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProductCategorySchema = new Schema({
  type_name: {
      type: String,
      required: [true, 'Product type name is required!']
  }
});

let ProductCategory = mongoose.model("ProductCategory", ProductCategorySchema);

module.exports = ProductCategory;
