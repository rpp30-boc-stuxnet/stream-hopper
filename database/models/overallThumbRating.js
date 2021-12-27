const mongoose = require('mongoose');

const overallThumbRatingSchema = mongoose.Schema(
  {
    tmdb_id: {type: Number, required: true},
    thumbs_ups: {type: Number, required: true},
    thumbs_downs: {type: Number, required: true}
  }
);

const Overall_Thumb_Rating = mongoose.model('Overall_Thumb_Rating', overallThumbRatingSchema);

module.exports = Overall_Thumb_Rating;