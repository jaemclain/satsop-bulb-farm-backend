const mongoose = require("mongoose");
const router = require("../routes");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  category: {
    type: String,
    trim: true
  },

  name: {
    type: String,
    trim: true,
    required: "Product Name"
  },

  color: {
    type: Array,
  },
  
  initalPrice: {
    type: Number,
    currency: "USD",
    price: 9990,
    required: "Price (USD)"
  },
  transactionPrice: {
    type: Number,
    currency: "USD",
    price: 9990,
    required: "Price (USD)"
  },
  plantingSeason: {
    type: String,
    trim: true,
  },

  sun: {
    type: String,
    trim: true
  },

  inStock: {
    type: Boolean
  },

  sale: {
    type: Boolean,
    default: false
  },

  description: {
    type: String,
    trim: true
  },

})




const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;