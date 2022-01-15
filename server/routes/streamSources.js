const express = require("express");
const router = express.Router();
const axios = require('axios').default;
const sourceDetailsControllers = require("../../database/controllers/sourceDetails.js");

router.get("/", async (req, res) => {
  let search_field;
  if (req.query.type && req.query.type === 'tv') {
    search_field = 'tmdb_tv_id'
  } else if (req.query.type && req.query.type === 'movie') {
    search_field = 'tmdb_movie_id'
  } else {
    res.status(400).send("Error: Must provide a valid 'type' (string of 'tv' or 'movie') in the query parameters");
    return;
  }

  if (!req.query.tmdb_id || typeof parseInt(req.query.tmdb_id) !== 'number' || parseInt(req.query.tmdb_id) % 1 !== 0) {
    res.status(400).send("Error: Must provide a valid 'tmdb_id' (integer) in the query parameters");
    return;
  }

  await axios.get(`https://api.watchmode.com/v1/search/`, {
    params: {
      apiKey: process.env.WATCHMODE_API_KEY,
      search_field: search_field,
      search_value: req.query.tmdb_id,
      types: 'tv,movie'
    }
  })
    .then(async (response) => {
      if (response.data.title_results.length === 0) {
        res.status(400).send("Error: Could not find a matching title in Watchmode's database");
        return;
      }

      let watchmode_id = response.data.title_results[0].id;

      await axios.get(`https://api.watchmode.com/v1/title/${watchmode_id}/sources`, {
        params: {
          apiKey: process.env.WATCHMODE_API_KEY,
          regions: 'US'
        }
      })
        .then((sources) => {
          sources.data.forEach((source) => {
            let companyInfo = sourceDetailsControllers.getSourceDetails(source.source_id);
            source.company_info = {
              source_id: source.source_id,
              name: companyInfo.name,
              logo_100px: companyInfo.logo_100px
            }
            delete source.source_id;
          });
          res.status(200).send(sources.data);
        })
    })
    .catch((error) => {
      res.status(400).send('Error while fetching sources from watchmode API: ' + error)
    })
});

module.exports = router;
