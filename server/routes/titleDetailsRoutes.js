// const express = require("express");
// const router = express.Router();
// const axios = require('axios').default;

// router.get("/", async (req, res) => {
//   let search_field;
//   if (req.query.type === 'tv') {
//     search_field = 'tmdb_tv_id'
//   } else if (req.query.type === 'movie') {
//     search_field = 'tmdb_movie_id'
//   } else {
//     res.status(400).send('Invalid \'type\' input in search query.  Acceptable options are \'tv\' or \'movie\'')
//   }

//   await axios.get(`https://api.watchmode.com/v1/search/`, {
//       params: {
//         apiKey: process.env.WATCHMODE_API_KEY,
//         search_field: search_field,
//         search_value: req.query.tmdb_id,
//         types: 'tv,movie'
//       }
//     })
//       .then(async (response) => {
//         let imdb_id = response.data.title_results[0].imdb_id;

//         await axios.get(`http://www.omdbapi.com/`, {
//           params: {
//             apikey: process.env.OMDB_API_KEY,
//             i: imdb_id,
//             plot: 'full'
//           }
//         })
//           .then((response) => {

//             let newResponse = {
//               title: response.data.Title,
//               poster_path: response.data.Poster,
//               ratings: response.data.Ratings,
//               run_time: response.data.Runtime,
//               director: response.data.Director,
//               synopsis: response.data.Plot,
//               type: req.query.type,
//               tmdb_id: req.query.tmdb_id,
//               parental_rating: response.data.Rated,
//               release_date: response.data.Released,
//               genre: response.data.genre
//             }
//             res.status(200).send(newResponse)
//           })
//       })
//       .catch((error) => {
//         res.status(400).send('Error while fetching IMDB ID from watchmode API: ' + error)
//       })
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const titleDetailsControllers = require("../../database/controllers/titleDetails.js");

router.get("/", titleDetailsControllers.findTitleDetails);

module.exports = router;
