const mongoose = require('mongoose');

const savedTitleSchema = mongoose.Schema(
  {
    user_id: {type: String, required: true},
    imdb_id: {type: String, required: true},
    tmdb_id: {type: Number, required: true}
  },
  { timestamps: true }
);

const Saved_Title = mongoose.model('Saved_Title', savedTitleSchema);

module.exports = Saved_Title;