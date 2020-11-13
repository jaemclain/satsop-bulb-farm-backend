const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HomeSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is Required",
    
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

const Home = mongoose.model("Home", HomeSchema);

module.exports = Home;
