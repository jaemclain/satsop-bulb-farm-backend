const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
orderId: {
    type: String,
    trim: true
},
customerTotalAmount: {
    type: Number
},
purchaseList: {
    type: Array
},
customerEmail: {
    type: String,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
},
customerAddress:{
    type: String,
},
customerCity: {
    type: String
},
customerState: {
    type: String
},
customerZipCode: {
    type: String
},
customerCountry: {
    type: String
},
completed: {
    type: Boolean,
    default: false
},
trackingNumber: {
    type: String,
    trim: true
},
updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;