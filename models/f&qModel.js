const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fqSchema = new Schema({
  question: {
    type: String,
    trim: true,
    
    
  },
  answer: {
    type: String,
    trim: true,
  },

  updatedAt: {
      type: Date,
      default: Date.now
  }
});

const fq = mongoose.model("fq", fqSchema);

module.exports = fq;
