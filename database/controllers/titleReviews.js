const axios = require('axios').default;
const Title_Review = require('../models/titleReviews.js');

const findTitleReviews = async (req, res) => {
  //console.log('req is hitting controller: ', req.query.user_id);
  await Title_Review.find({ tmdb_id: req.query.tmdb_id })
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
  //console.log('req is hitting controller: ', req.body);
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