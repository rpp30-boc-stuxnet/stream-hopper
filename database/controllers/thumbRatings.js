const axios = require('axios').default;
const User_Thumb_Rating = require('../models/userThumbRating.js');
const Overall_Thumb_Rating = require('../models/overallThumbRating.js');

const findThumbRatings = async (req, res) => {
  await User_Thumb_Rating.findOne({user_id: req.query.user_id, tmdb_id: req.query.tmdb_id})
    .then(async (userThumbRating) => {
      console.dir(userThumbRating);
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
  // req.body: {tmdb_id, user_id, prevThumbRating, newThumbRating}
    // prevThumbRating and newThumbRating can be null, 'up', or 'down'
  console.log('inside saveThumbRating')
}

// const addSavedTitle = async (req, res) => {
//   let posterPath;

//   await axios.get(`https://api.themoviedb.org/3/${req.body.type}/${req.body.tmdb_id}`, {
//       params: {
//         api_key: process.env.TMDB_API_KEY
//       }
//     })
//       .then((result) => {
//         posterPath = 'https://image.tmdb.org/t/p/w500' + result.data.poster_path;
//       })
//       .catch((error) => {
//         res.status(400).send('Error while fetching tmdb id from tmdb\'s API: ' + error)
//       })

//   Saved_Title.find({user_id: req.body.user_id, type: req.body.type, tmdb_id: req.body.tmdb_id})
//     .then((savedTitles) => {
//       if (savedTitles.length > 0) {
//         res.status(400).send('Movie already exists in user\'s list')
//       } else {
//         Saved_Title.create({user_id: req.body.user_id, type: req.body.type, tmdb_id: req.body.tmdb_id, poster_path: posterPath})
//           .then(() => {
//             res.status(201).send('Title added successfully');
//           })
//           .catch((error) => {
//             res.status(400).send(error)
//           })
//       }
//     })
//     .catch((error) => {
//       res.status(400).send('Error inside Saved_Title.find function: ' + error)
//     })
// }

// const deleteSavedTitle = async (req, res) => {
//   Saved_Title.findOneAndDelete({user_id: req.body.user_id, tmdb_id: req.body.tmdb_id})
//     .then((response) => {
//       if (response === null) {
//         res.status(200).send('Title was not found in list')
//       } else {
//         res.status(200).send('Title deleted successfully');
//       }
//     })
//     .catch((error) => {
//       res.status(400).send(error)
//     })
// }

module.exports.findThumbRatings = findThumbRatings;
module.exports.saveThumbRating = saveThumbRating;
// module.exports.addSavedTitle = addSavedTitle;
// module.exports.deleteSavedTitle = deleteSavedTitle;