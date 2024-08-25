const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
  // flightNumber: Number,
  flightNumber: {
    type: Number,
    required: true,
    // default: 100
  },
  launchDate: {
    type: Date,
    required: true
  },
  mission: {
    type: String,
    required: true
  },
  rocket: {
    type: String,
    required: true
  },
  target: {
    // type: mongoose.ObjectId,
    // ref: 'Planet'
    type: String,
    /* required: true, */
  },
  customers: [ String ],
  upcoming: {
    type: Boolean,
    required: true
  },
  success: {
    type: Boolean,
    required: true,
    default: true
  }
});

// Connects launchesSchema with the "launches" collection
module.exports = mongoose.model('Launch', launchesSchema);
