const axios = require('axios').default;
const User_Thumb_Rating = require('../models/userThumbRating.js');
const Overall_Thumb_Rating = require('../models/overallThumbRating.js');

const findThumbRatings = async (req, res) => {

  if (!req.query.user_id || typeof req.query.user_id !== 'string' || req.query.user_id.length === 0) {
    res.status(400).send("Error: Must provide a valid 'user_id' (string) in the query parameters");
    return;
  } else if (!req.query.tmdb_id || typeof parseInt(req.query.tmdb_id) !== 'number' || parseInt(req.query.tmdb_id) % 1 !== 0) {
    res.status(400).send("Error: Must provide a valid 'tmdb_id' (integer) in the query parameters");
    return;
  }

  await User_Thumb_Rating.findOne({user_id: req.query.user_id, tmdb_id: req.query.tmdb_id})
    .then(async (userThumbRating) => {
      let user_thumb_rating;
      if (userThumbRating) {
        user_thumb_rating = userThumbRating.thumb_rating;
      } else {
        user_thumb_rating = null;
      }
      await Overall_Thumb_Rating.findOne({tmdb_id: req.query.tmdb_id})
        .then((overallThumbRating) => {
          let overall_thumbs_ups;
          let overall_thumbs_down;
          if (overallThumbRating) {
            overall_thumbs_ups = overallThumbRating.thumbs_ups || 0;
            overall_thumbs_downs = overallThumbRating.thumbs_downs || 0;
          } else {
            overall_thumbs_ups = 0;
            overall_thumbs_downs = 0;
          }
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
  // req.body.tmdb_id = parseInt(req.body.tmdb_id)

  if (!req.body.user_id || typeof req.body.user_id !== 'string' || req.body.user_id.length === 0) {
    res.status(400).send("Error: Must provide a valid 'user_id' (string) in the body parameters");
    return;
  } else if (!req.body.tmdb_id || typeof req.body.tmdb_id !== 'number' || req.body.tmdb_id % 1 !== 0) {
    res.status(400).send("Error: Must provide a valid 'tmdb_id' (integer) in the body parameters");
    return;
  } else if (req.body.prev_thumb_rating === undefined || !(req.body.prev_thumb_rating === 'up' || req.body.prev_thumb_rating === 'down' || req.body.prev_thumb_rating === null)) {
    res.status(400).send("Error: Must provide a valid 'prev_thumb_rating' (string of 'up' or down' OR null) in the body parameters");
    return;
  } else if (req.body.new_thumb_rating === undefined || !(req.body.new_thumb_rating === 'up' || req.body.new_thumb_rating === 'down' || req.body.new_thumb_rating === null)) {
    res.status(400).send("Error: Must provide a valid 'new_thumb_rating' (string of 'up' or down' OR null) in the body parameters");
    return;
  }

  if (req.body.prev_thumb_rating === req.body.new_thumb_rating) {
    req.body.new_thumb_rating = null;
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
        await Overall_Thumb_Rating.find({ tmdb_id: req.body.tmdb_id })
          .then(async (results) => {
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