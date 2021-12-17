const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
  title: String,
  year : Number,
  director: String,
  imdb_rating: Number
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;