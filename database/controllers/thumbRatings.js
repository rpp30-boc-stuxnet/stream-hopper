const axios = require('axios').default;
const User_Thumb_Rating = require('../models/userThumbRating.js');
const Overall_Thumb_Rating = require('../models/overallThumbRating.js');

const findThumbRatings = async (req, res) => {
  await User_Thumb_Rating.findOne({user_id: req.query.user_id, tmdb_id: req.query.tmdb_id})
    .then(async (userThumbRating) => {
      let user_thumb_rating = userThumbRating.thumb_rating || null;
      await Overall_Thumb_Rating.findOne({tmdb_id: req.query.tmdb_id})
        .then((overallThumbRating) => {
          let overall_thumbs_ups = overallThumbRating.thumbs_ups || null;
          let overall_thumbs_downs = overallThumbRating.thumbs_downs || null;
          res.status(200).send({
            user_id: req.query.user_id,
            tmdb_id: new Number(req.query.tmdb_id),
            user_thumb_rating: user_thumb_rating,
            overall_thumbs_ups: overall_thumbs_ups,
            overall_thumbs_downs: overall_thumbs_downs
          })
        })
    })
    .catch((error) => {
      res.status(400).send('Error fetching thumb ratings: ' + error)
    })
}

const saveThumbRating = async (req, res) => {
  // req.body: {tmdb_id, user_id, prev_thumb_rating, new_thumb_rating}
    // prev_thumb_rating and new_thumb_rating can be null, 'up', or 'down'

  if (req.body.prev_thumb_rating === req.body.new_thumb_rating) {
    res.status(200).send('No changes made.  Previous and new thumb ratings were the same');
    return;
  }

  User_Thumb_Rating.findOneAndUpdate(
    { user_id: req.body.user_id, tmdb_id: req.body.tmdb_id },
    { thumb_rating: req.body.new_thumb_rating },
    {new: true, upsert: true, useFindAndModify: false },
    async (error, response) => {
      if (error) {
        res.status(400).send('Error during findOneAndUpdate User_Thumb_Rating: ' + error);
        return;
      } else {
        // findOne to see if movie has thumb ratings
        await Overall_Thumb_Rating.find({ tmdb_id: req.body.tmdb_id })
          .then(async (results) => {
            // if movie doesn't have any existing thumb ratings
            if (results.length === 0) {
              let thumbsUps = 0;
              let thumbsDowns = 0;

              if (req.body.new_thumb_rating === 'up') {
                thumbsUps = 1;
              } else if (req.body.new_thumb_rating === 'down') {
                thumbsDowns = 1;
              }

              await Overall_Thumb_Rating.create({tmdb_id: req.body.tmdb_id, thumbs_ups: thumbsUps, thumbs_downs: thumbsDowns})
                .then(() => {
                  res.status(201).send('Thumb rating saved successfully');
                  return;
                })
                .catch((error) => {
                  res.status(400).send(error)
                  return;
                })
            } else {
              // update existing one
              let thumbsUpChange = 0;
              let thumbsDownChange = 0;

              if (req.body.prev_thumb_rating === 'up') {
                thumbsUpChange += -1;
              } else if (req.body.prev_thumb_rating === 'down') {
                thumbsDownChange += -1;
              }

              if (req.body.new_thumb_rating === 'up') {
                thumbsUpChange += 1;
              } else if (req.body.new_thumb_rating === 'down') {
                thumbsDownChange += 1;
              }

              results[0].updateOne(
                { $inc: {'thumbs_ups': thumbsUpChange, 'thumbs_downs': thumbsDownChange } },
                // {new: true, upsert: true, useFindAndModify: false },
                async (error, response) => {
                  if (error) {
                    res.status(400).send('Error during findOneAndUpdate User_Thumb_Rating: ' + error);
                    return;
                  } else {
                    res.status(201).send('Thumb rating saved successfully');
                    return;
                  }
                }
              )
            }
          })
      }
    }
  )

}

module.exports.findThumbRatings = findThumbRatings;
module.exports.saveThumbRating = saveThumbRating;