const mongoose = require('mongoose');

const titleReviewSchema = mongoose.Schema(
  {
    tmdb_id: {type: Number, required: true},
    type: {type: String, required: true},
    user_id: {type: String, required: true},
    username: {type: String, required: true},
    review_body: {type: String, require: true, maxLength: 280}
  },
  {timestamps: true}
);

const Title_Review = mongoose.model('Title_Review', titleReviewSchema);

module.exports = Title_Review;