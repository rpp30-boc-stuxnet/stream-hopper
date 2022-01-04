const Saved_Title = require('../models/savedTitle.js');
const axios = require('axios').default;


const findTrendingTitles = async (req, res) => {
  let visitedTitles = {};
  let userSavedTitles = {};

  await Saved_Title.find({user_id: req.query.user_id})
    .then((savedTitles) => {
      for (var i = 0; i < savedTitles.length; i++) {
        userSavedTitles[savedTitles[i].tmdb_id] = true;
      }
    })
    .catch((error) => {
      res.status(400).send('Error while finding user\'s saved titles: ' + error);
      return;
    })

  let finalResults = [];
    await axios.get(`https://api.themoviedb.org/3/trending/all/week`, {
      params: {
        api_key: process.env.TMDB_API_KEY
      }
    })
      .then((response) => {
        for (var i = 0; i < response.data.results.length; i++) {
          if (!visitedTitles[response.data.results[i].id]) {
            let currentRecommendation = {
              type: response.data.results[i].media_type,
              tmdb_id: response.data.results[i].id,
              poster_path: 'https://image.tmdb.org/t/p/w500' + response.data.results[i].poster_path,
              saved_by_user: userSavedTitles[response.data.results[i].id] || false
            }
            finalResults.push(currentRecommendation);
            visitedTitles[currentRecommendation.tmdb_id] = true;
          }
        }
      })
      .catch((error) => {
        res.status(400).send('Error while fetching related ID\'s from watchmode API: ' + error);
        return;
      })

  res.status(200).send(finalResults)

}

module.exports.findTrendingTitles = findTrendingTitles;