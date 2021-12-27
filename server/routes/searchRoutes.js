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
            transformedResults.push({
              tmdb_id: individualResult.id,
              type: individualResult.media_type,
              title: individualResult.title || individualResult.name,
              release_date: individualResult.release_date || individualResult.first_air_date,
              poster_path: 'https://image.tmdb.org/t/p/w500' + individualResult.poster_path
            })
          }
        }
        res.status(200).send(transformedResults);
      })
      .catch((error) => {
        res.status(400).send('Error while fetching search results from TMDB API: ' + error)
      })
});

module.exports = router;
