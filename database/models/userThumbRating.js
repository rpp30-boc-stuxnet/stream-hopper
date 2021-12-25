const mongoose = require('mongoose');

const userThumbRatingSchema = mongoose.Schema(
  {
    user_id: {type: String, required: true},
    tmdb_id: {type: Number, required: true},
    thumb_rating: {type: String, enum: ['up', 'down'], required: true}
  }
);

const User_Thumb_Rating = mongoose.model('User_Thumb_Rating', userThumbRatingSchema);

module.exports = User_Thumb_Rating;