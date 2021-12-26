const axios = require('axios').default;
const User_Stream_Rating = require('../models/userStreamRating.js');
const Overall_Stream_Rating = require('../models/overallStreamRating.js');

const findStreamRatings = async (req, res) => {
  await User_Stream_Rating.findOne(
    {
      user_id: req.query.user_id,
      tmdb_id: req.query.tmdb_id,
      source_company_id: req.query.source_company_id,
      stream_type: req.query.stream_type,
      stream_format: req.query.stream_format
    }
  )
    .then(async (userSourceRating) => {
      if (userSourceRating === null) {
        userSourceRating = {};
      }
      let user_audio_quality_rating = userSourceRating.audio_quality_rating || null;
      let user_video_quality_rating = userSourceRating.video_quality_rating || null;
      let user_stream_reliability_rating = userSourceRating.stream_reliability_rating || null;

      Overall_Stream_Rating.findOne(
        {
          tmdb_id: req.query.tmdb_id,
          source_company_id: req.query.source_company_id,
          stream_type: req.query.stream_type,
          stream_format: req.query.stream_format
        }
      )
        .then((overallStreamRating) => {
          if (overallStreamRating === null) {
            overallStreamRating = {};
          }
          res.status(200).send({
            user_id: req.query.user_id,
            tmdb_id: new Number(req.query.tmdb_id),
            source_company_id: req.query.source_company_id,
            stream_type: req.query.stream_type,
            stream_format: req.query.stream_format,
            user_audio_quality_rating: user_audio_quality_rating,
            user_video_quality_rating: user_video_quality_rating,
            user_stream_reliability_rating: user_stream_reliability_rating,
            audio_average_rating: parseFloat((overallStreamRating.audio_total_stars / overallStreamRating.count_of_reviews).toFixed(2) || 0),
            video_average_rating: parseFloat((overallStreamRating.video_total_stars / overallStreamRating.count_of_reviews).toFixed(2) || 0),
            reliability_average_rating: parseFloat((overallStreamRating.reliability_total_stars / overallStreamRating.count_of_reviews).toFixed(2) || 0),
            count_of_reviews: overallStreamRating.count_of_reviews || 0
          })
        })
    })
    .catch((error) => {
      res.status(400).send('Error fetching stream ratings: ' + error)
    })
}

const saveStreamRating = async (req, res) => {
  await User_Stream_Rating.findOne({
      user_id: req.body.user_id,
      tmdb_id: req.body.tmdb_id,
      source_company_id: req.body.source_company_id,
      stream_type: req.body.stream_type,
      stream_format: req.body.stream_format
  })
    .then(async (userStreamRatingResult) => {
      //if userStreamRating result is null
      if (userStreamRatingResult === null) {
        // save new User_Stream_Rating
        User_Stream_Rating.create(
          {
            user_id: req.body.user_id,
            tmdb_id: req.body.tmdb_id,
            source_company_id: req.body.source_company_id,
            stream_type: req.body.stream_type,
            stream_format: req.body.stream_format,
            audio_quality_rating: req.body.user_audio_quality_rating,
            video_quality_rating: req.body.user_video_quality_rating,
            stream_reliability_rating: req.body.user_stream_reliability_rating
          },
          (async (err, response) => {
          if (err) {
            res.status(400).send('Error saving new User_Stream_Rating to db: ' + err);
            return;
          } else {
            // find related overallStreamRating
            await Overall_Stream_Rating.findOne({
              tmdb_id: req.body.tmdb_id,
              source_company_id: req.body.source_company_id,
              stream_type: req.body.stream_type,
              stream_format: req.body.stream_format
            })
              .then(async (overallStreamRatingResult) => {
                // if overallStreamRatingResult is null
                if (overallStreamRatingResult === null) {
                  // create new overallStreamRating using count of 1 and user's rating for each characteristic
                  Overall_Stream_Rating.create({
                    tmdb_id: req.body.tmdb_id,
                    source_company_id: req.body.source_company_id,
                    stream_type: req.body.stream_type,
                    stream_format: req.body.stream_format,
                    audio_total_stars: req.body.user_audio_quality_rating,
                    video_total_stars: req.body.user_video_quality_rating,
                    reliability_total_stars: req.body.user_stream_reliability_rating,
                    count_of_reviews: 1
                  },
                  (err, response) => {
                    if (err) {
                      res.status(400).send('Error saving Overall_Stream_Ratng to db: ' + err);
                      return;
                    } else {
                      res.status(201).send('Stream rating saved successfully');
                      return;
                    }
                  })
                // else overallStreamRatingResult is not null
                } else {
                  // update overallStreamRating by incrementing each rating by user's rating, and incrementing count by 1
                  Overall_Stream_Rating.findOneAndUpdate(
                    {
                      tmdb_id: req.body.tmdb_id,
                      source_company_id: req.body.source_company_id,
                      stream_type: req.body.stream_type,
                      stream_format: req.body.stream_format
                    },
                    {
                      $inc: {
                        'audio_total_stars': req.body.user_audio_quality_rating,
                        'video_total_stars': req.body.user_video_quality_rating,
                        'reliability_total_stars': req.body.user_stream_reliability_rating,
                        'count_of_reviews': 1
                      }
                    },
                    {new: true, upsert: true, useFindAndModify: false },
                    async (err, response) => {
                      if (err) {
                        res.status(400).send('Error updating Overall_Stream_Rating in db: ' + err);
                        return;
                      } else {
                        res.status(201).send('Stream rating saved successfully');
                        return;
                      }
                    }
                  )
                }
              })
          }
        }))
      // if userStreamRating result is not null
      } else {
        // find increments for each rating
        let audioDiff = req.body.user_audio_quality_rating - userStreamRatingResult._doc.audio_quality_rating;
        let videoDiff = req.body.user_video_quality_rating - userStreamRatingResult._doc.video_quality_rating;
        let reliabilityDiff = req.body.user_stream_reliability_rating - userStreamRatingResult._doc.stream_reliability_rating;

        // update User_Stream_Rating
        User_Stream_Rating.findOneAndUpdate(
          {
            user_id: req.body.user_id,
            tmdb_id: req.body.tmdb_id,
            source_company_id: req.body.source_company_id,
            stream_type: req.body.stream_type,
            stream_format: req.body.stream_format
          },
          {
            'audio_quality_rating': req.body.user_audio_quality_rating,
            'video_quality_rating': req.body.user_video_quality_rating,
            'stream_reliability_rating': req.body.user_stream_reliability_rating
          },
          {new: true, upsert: true, useFindAndModify: false },
          async (err, response) => {
            if (err) {
              res.status(400).send('Error updating User_Stream_Rating in db: ' + err);
              return;
            } else {
              // update overallStreamRating by incrementing each characteristic by the relevant value (diff in new - old)
              Overall_Stream_Rating.findOneAndUpdate(
                {
                  tmdb_id: req.body.tmdb_id,
                  source_company_id: req.body.source_company_id,
                  stream_type: req.body.stream_type,
                  stream_format: req.body.stream_format
                },
                {
                  $inc: {
                    'audio_total_stars': audioDiff,
                    'video_total_stars': videoDiff,
                    'reliability_total_stars': reliabilityDiff
                  }
                },
                {new: true, upsert: true, useFindAndModify: false },
                async (err, responseponse) => {
                  if (err) {
                    res.status(400).send('Error updating Overall_Stream_Rating in db: ' + err);
                    return;
                  } else {
                    res.status(201).send('Stream rating saved successfully');
                    return;
                  }
                }
              )
            }
          }
        )

      }
    })
    .catch((error) => {
      res.status(200).send('Error saving stream rating: ' + error)
    })
}

module.exports.findStreamRatings = findStreamRatings;
module.exports.saveStreamRating = saveStreamRating;