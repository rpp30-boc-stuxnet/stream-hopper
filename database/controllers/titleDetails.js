const Saved_Title = require('../models/savedTitle.js');
const axios = require('axios').default;


const findTitleDetails = async (req, res) => {
  let userSavedTitles = {};
  let saved_by_user;

  await Saved_Title.findOne({user_id: req.query.user_id, tmdb_id: req.query.tmdb_id})
    .then((savedTitle) => {
      if (savedTitle) {
        saved_by_user = true
      } else {
        saved_by_user = false
      }
    })
    .catch((error) => {
      res.status(400).send('Error while looking up title in user\'s saved titles list: ' + error);
      return;
    })

  let searchField;
  if (req.query.type === 'tv') {
    searchField = 'tmdb_tv_id';
  } else if (req.query.type === 'movie') {
    searchField = 'tmdb_movie_id'
  } else {
    res.status(400).send('Invalid \'type\' input in search query.  Acceptable options are \'tv\' or \'movie\'')
  }

  await axios.get(`https://api.watchmode.com/v1/search/`, {
      params: {
        apiKey: process.env.WATCHMODE_API_KEY,
        search_field: searchField,
        search_value: req.query.tmdb_id,
        types: 'tv,movie'
      }
    })
      .then(async (response) => {
        let imdb_id = response.data.title_results[0].imdb_id;

        await axios.get(`http://www.omdbapi.com/`, {
          params: {
            apikey: process.env.OMDB_API_KEY,
            i: imdb_id,
            plot: 'full'
          }
        })
          .then(async (response) => {

            let newResponse = {
              title: response.data.Title,
              ratings: response.data.Ratings,
              run_time: response.data.Runtime,
              director: response.data.Director,
              synopsis: response.data.Plot,
              type: req.query.type,
              tmdb_id: req.query.tmdb_id,
              parental_rating: response.data.Rated,
              release_date: response.data.Released,
              genre: response.data.genre,
              poster_path: 'https://i.imgur.com/7sR45d6.png',
              saved_by_user
            }

            await axios.get(`https://api.themoviedb.org/3/${req.query.type}/${req.query.tmdb_id}`, {
              params: {
                api_key: process.env.TMDB_API_KEY
              }
            })
              .then((omdbResponse) => {
                if (omdbResponse && omdbResponse.data.poster_path) {
                  newResponse.poster_path = `https://image.tmdb.org/t/p/w500${omdbResponse.data.poster_path}`
                }
              })
              .catch((error) => {
                res.status(400).send('Error while retrieving poster from TMDB API: ' + error);
                return;
              })

            res.status(200).send(newResponse)
          })
      })
      .catch((error) => {
        res.status(400).send('Error while fetching IMDB ID from watchmode API: ' + error);
        return;
      })

}

module.exports.findTitleDetails = findTitleDetails;