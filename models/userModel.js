const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  CompanyName: {
    type: String,
    trim: true,
    // required: "Username is Required"
  },
  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [({ length }) => length >= 6, "Password should be longer."]
  },
  // phoneNumber: {
  //   type: String,
  //   trim: true,
  //   match: [/^\d{10}$/, "Please enter a valid phone number"]
  // },
  address:{
    type: String,
    trim: true,
    // required: "Address is Required",
  },
  state: {
    type: String,
    trim: true,
    // required: "State is Required",
  },
  zipCode: {
    type: Number,
    trim: true,
    // required: "ZipCode is Required"
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

const User = mongoose.model("User", UserSchema);

module.exports = User;
