const express = require("express");
const router = express.Router();
const axios = require('axios').default;

router.get("/", async (req, res) => {

  await axios.get(`https://api.themoviedb.org/3/search/multi`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: req.query.title,
        adult: 'false'
      }
    })
      .then(async (response) => {
        let transformedResults = [];

        for (var i = 0; i < response.data.results.length; i++) {
          if (response.data.results[i].media_type === 'tv' || response.data.results[i].media_type === 'movie') {
            let individualResult = response.data.results[i];
            let posterURL;
            if (individualResult.poster_path) {
              posterURL = 'https://image.tmdb.org/t/p/w500' + individualResult.poster_path
            } else {
              posterURL = 'https://i.imgur.com/7sR45d6.png'
            }
            transformedResults.push({
              tmdb_id: individualResult.id,
              type: individualResult.media_type,
              title: individualResult.title || individualResult.name,
              release_date: individualResult.release_date || individualResult.first_air_date,
              poster_path: posterURL
            })
          }
        }
        res.status(200).send(transformedResults);
      })
      .catch((error) => {
        res.status(400).send('Error while fetching search results from TMDB API: ' + (error.response.data.status_message || error.response.data.errors[0]))
      })
});

module.exports = router;
