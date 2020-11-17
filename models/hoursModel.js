const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HoursSchema = new Schema({
day: {
    type: String,
    trim: true
},
startTime: {
    type: Number
},
endTime: {
    type: Number
},
updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Hours = mongoose.model("Hours", HoursSchema);

module.exports = Hours;