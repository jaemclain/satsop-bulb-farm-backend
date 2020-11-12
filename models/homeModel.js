const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HomeSchema = new Schema({
  section: {
    type: String,
    trim: true,
    required: "Username is Required"
  },

  title: {
    type: String,
    trim: true,
    required: "Password is Required",
    
  },

  text: {
    type: String,
    trim: true,
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
