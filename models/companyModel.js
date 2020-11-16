const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  CompanyName: {
    type: String,
    trim: true,
  },
  companyEmail: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  phoneNumber: {
    type: String,
    trim: true,
    match: [/^\d{10}$/, "Please enter a valid phone number"]
  },
  address:{
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  zipCode: {
    type: Number,
    trim: true,
  },
  facebook: {
    type: String,
    trim: true
  },
  instagram: {
    type: String,
    trim: true
  },
  twitter: {
    type: String,
    trim: true
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const CompanyInfo = mongoose.model("CompanyInfo", CompanyInfoSchema);

module.exports = CompanyInfo;