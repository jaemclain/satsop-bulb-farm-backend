const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const faqSchema = new Schema({
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

const faq = mongoose.model("faq", faqSchema);

module.exports = faq;
