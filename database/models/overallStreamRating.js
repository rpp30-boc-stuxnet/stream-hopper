const mongoose = require('mongoose');

const overallStreamRatingSchema = mongoose.Schema(
  {
    tmdb_id: {type: Number, required: true},
    title_type: {type: String, required: true},
    source_company_id: {type: Number, required: true},
    stream_type: {type: String, required: true},
    stream_format: {type: String, required: true},
    audio_total_stars: {type: Number, required: true},
    video_total_stars: {type: Number, required: true},
    reliability_total_stars: {type: Number, required: true},
    count_of_reviews: {type: Number, required: true}
  }
);

const Overall_Stream_Rating = mongoose.model('Overall_Stream_Rating', overallStreamRatingSchema);

module.exports = Overall_Stream_Rating;
