const mongoose = require('mongoose');

const planetsSchema = new mongoose.Schema({
  // id: {
  //   type: Number,
  //   required: true
  // },
  keplerName: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Planet', planetsSchema);
