const Saved_Title = require('../models/savedTitle.js');
const axios = require('axios').default;


const findTitleDetails = async (req, res) => {
  let userSavedTitles = {};
  let saved_by_user;
  console.dir(req.query, 'req query')
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
    res.status(400).send('Invalid \'type\' input in search query.  Acceptable options are \'tv\' or \'movie\'');
    return;
  }

  await axios.get(`https://api.watchmode.com/v1/search/`, {
      params: {
        apiKey: process.env.WATCHMODE_API_KEY,
        search_field: searchField,
        search_value: req.query.tmdb_id,
        types: 'tv,movie'
      }
    })
      .then(async (watchmodeResponse) => {
        let imdb_id = watchmodeResponse.data.title_results[0].imdb_id;

        await axios.get(`http://www.omdbapi.com/`, {
          params: {
            i: imdb_id,
            apikey: process.env.OMDB_API_KEY,
            plot: 'full'
          }
        })
          .then(async (omdbResponse) => {
            let newResponse;

            if(omdbResponse.data.imdbID !== imdb_id) {
              await axios.get(`http://www.omdbapi.com/`, {
                params: {
                  i: omdbResponse.data.imdbID,
                  apikey: process.env.OMDB_API_KEY,
                  plot: 'full'
                }
              })
                .then((newOmdbResponse) => {
                  newResponse = {
                    title: newOmdbResponse.data.Title,
                    ratings: newOmdbResponse.data.Ratings,
                    run_time: newOmdbResponse.data.Runtime,
                    director: newOmdbResponse.data.Director,
                    synopsis: newOmdbResponse.data.Plot,
                    type: req.query.type,
                    tmdb_id: req.query.tmdb_id,
                    parental_rating: newOmdbResponse.data.Rated,
                    release_date: newOmdbResponse.data.Released,
                    genre: newOmdbResponse.data.genre,
                    poster_path: 'https://i.imgur.com/7sR45d6.png',
                    saved_by_user
                  }
                })
            } else {
              newResponse = {
                title: omdbResponse.data.Title,
                ratings: omdbResponse.data.Ratings,
                run_time: omdbResponse.data.Runtime,
                director: omdbResponse.data.Director,
                synopsis: omdbResponse.data.Plot,
                type: req.query.type,
                tmdb_id: req.query.tmdb_id,
                parental_rating: omdbResponse.data.Rated,
                release_date: omdbResponse.data.Released,
                genre: omdbResponse.data.genre,
                poster_path: 'https://i.imgur.com/7sR45d6.png',
                saved_by_user
              }
            }


            await axios.get(`https://api.themoviedb.org/3/${req.query.type}/${req.query.tmdb_id}`, {
              params: {
                api_key: process.env.TMDB_API_KEY
              }
            })
              .then((tmdbResponse) => {
                if (tmdbResponse && tmdbResponse.data.poster_path) {
                  newResponse.poster_path = `https://image.tmdb.org/t/p/w500${tmdbResponse.data.poster_path}`
                }
              })
              .catch((error) => {
                res.status(400).send('Error while retrieving poster from TMDB API: ' + error);
                return;
              })
              console.dir(newReponse, 'reponse')
            res.status(200).send(newResponse)
          })
      })
      .catch((error) => {
        res.status(400).send('Error while fetching IMDB ID from watchmode API: ' + error);
        return;
      })

}

module.exports.findTitleDetails = findTitleDetails;