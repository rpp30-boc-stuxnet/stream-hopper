const axios = require('axios').default;
const Title_Review = require('../models/titleReviews.js');

const findTitleReviews = async (req, res) => {
  if (!req.query.tmdb_id || typeof parseInt(req.query.tmdb_id) !== 'number' || parseInt(req.query.tmdb_id) % 1 !== 0) {
    res.status(400).send("Error: Must provide a valid 'tmdb_id' (integer) in the query parameters");
    return;
  } else if (!req.query.type || typeof req.query.type !== 'string' || (req.query.type !== 'tv' && req.query.type !== 'movie')) {
    res.status(400).send("Error: Must provide a valid 'title_type' (string of 'tv' or 'movie') in the query parameters");
    return;
  }


  await Title_Review.find({ tmdb_id: req.query.tmdb_id, type: req.query.type })
    .then((reviews) => {
      res.status(200).send(reviews.reverse())
    })
    .catch((error) => {
      console.log('error getting title reviews: ', error)
      res.status(400).send(error);
      return;
    })
}

const addTitleReview = async (req, res) => {

  if (!req.body.tmdb_id || typeof parseInt(req.body.tmdb_id) !== 'number' || parseInt(req.body.tmdb_id) % 1 !== 0) {
    res.status(400).send("Error: Must provide a valid 'tmdb_id' (integer) in the body parameters");
    return;
  } else if (!req.body.type || typeof req.body.type !== 'string' || (req.body.type !== 'tv' && req.body.type !== 'movie')) {
    res.status(400).send("Error: Must provide a valid 'title_type' (string of 'tv' or 'movie') in the body parameters");
    return;
  } else if (!req.body.user_id || typeof req.body.user_id !== 'string') {
    res.status(400).send("Error: Must provide a valid 'user_id' (string) in the body parameters")
    return;
  } else if (!req.body.username || typeof req.body.username !== 'string') {
    res.status(400).send("Error: Must provide a valid 'username' (string) in the body parameters")
    return;
  } else if (!req.body.review_body || typeof req.body.review_body !== 'string') {
    res.status(400).send("Error: Must provide a valid 'review_body' (string) in the body parameters")
    return;
  }

  Title_Review.create(req.body)
    .then(() => {
      res.status(201).send('Review saved successfully');
    })
    .catch((error) => {
      res.status(400).send(error);
      return;
    })
}

module.exports.findTitleReviews = findTitleReviews;
module.exports.addTitleReview = addTitleReview;