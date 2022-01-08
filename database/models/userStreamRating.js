const mongoose = require('mongoose');

const userStreamRatingSchema = mongoose.Schema(
  {
    user_id: {type: String, required: true},
    title_type: {type: String, required: true},
    tmdb_id: {type: Number, required: true},
    source_company_id: {type: Number, required: true},
    stream_type: {type: String, required: true},
    stream_format: {type: String, required: true},
    audio_quality_rating: {type: Number, required: true},
    video_quality_rating: {type: Number, required: true},
    stream_reliability_rating: {type: Number, required: true}
  }
);

const User_Stream_Rating = mongoose.model('User_Stream_Rating', userStreamRatingSchema);

module.exports = User_Stream_Rating;