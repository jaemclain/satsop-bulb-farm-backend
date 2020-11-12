const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Product Name"
  },

  color: {
    type: String,
    trim: true,
  },

  price: {
    type: Number,
    required: "Price (USD)"
  },

  bloomSeason: {
    type: String,
    trim: true,
  },

  plantingSeason: {
    type: String,
    trim: true,
  },

  sun: {
    type: Boolean
  },

  drainedSoil: {
    type: Boolean
  },

  inStock: {
    type: Boolean
  },

  sale: {
    type: Boolean
  },

})


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;