
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const moviesSchema = new Schema({
  title : String,
  genre : String,
  plot  : String
});

module.exports = mongoose.model('Movies', moviesSchema);
