const Saved_Title = require('../models/savedTitle.js');
const axios = require('axios').default;

const findIfUserSaved = async (userId, tmdbId) => {
  return Saved_Title.findOne({user_id: userId, tmdb_id: tmdbId})
    .then((savedTitle) => {
      if (savedTitle) {
        return Promise.resolve(true)
      } else {
        return Promise.resolve(false)
      }
    })
    .catch((error) => {
      return Promise.reject('Error while looking up title in user\'s saved titles list: ' + error);
    })

}

const findTextDetails = async (titleType, tmdbId) => {
  let allDetails;
  let searchField;
  let hasError = false;
  let errorMessage = '';

  if (titleType === 'tv') {
    searchField = 'tmdb_tv_id'
  } else if (titleType === 'movie') {
    searchField = 'tmdb_movie_id'
  } else {
    return('Invalid \'type\' input in search query.  Acceptable options are \'tv\' or \'movie\'');
  }

  await axios.get(`https://api.watchmode.com/v1/search/`, {
    params: {
      apiKey: process.env.WATCHMODE_API_KEY,
      search_field: searchField,
      search_value: tmdbId,
      types: 'tv,movie'
    }
  })
    .then(async (watchmodeResponse) => {
      if (watchmodeResponse.data.title_results.length === 0) {
        return Promise.reject(`TMDB ID ${tmdbId} did not return a matching IMDB ID from the Watchmode API`)
      } else {
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
                  allDetails = {
                    title: newOmdbResponse.data.Title,
                    ratings: newOmdbResponse.data.Ratings,
                    run_time: newOmdbResponse.data.Runtime,
                    director: newOmdbResponse.data.Director,
                    synopsis: newOmdbResponse.data.Plot,
                    type: titleType,
                    tmdb_id: tmdbId,
                    parental_rating: newOmdbResponse.data.Rated,
                    release_date: newOmdbResponse.data.Released,
                    genre: newOmdbResponse.data.genre
                  }
                })
                .catch((error) => {
                  hasError = true;
                  errorMessage = 'Error fetching title details from OMDB API: ' + error.response.data.Error;
                })
            } else {
              allDetails = {
                title: omdbResponse.data.Title,
                ratings: omdbResponse.data.Ratings,
                run_time: omdbResponse.data.Runtime,
                director: omdbResponse.data.Director,
                synopsis: omdbResponse.data.Plot,
                type: titleType,
                tmdb_id: tmdbId,
                parental_rating: omdbResponse.data.Rated,
                release_date: omdbResponse.data.Released,
                genre: omdbResponse.data.genre
              }
            }
          })
          .catch((error) => {
            hasError = true;
            errorMessage = 'Error fetching title details from OMDB API: ' + error.response.data.Error;
          })
      }
    })
    .catch((error) => {
      hasError = true;
      errorMessage = 'Error fetching imdb_id from Watchmode API: ' + error.response.data.statusMessage;
    })

    if (hasError) {
      return Promise.reject(errorMessage);
    } else {
      return Promise.resolve(allDetails);
    }
}

const findPosterUrl = async (titleType, tmdbId) => {
  return axios.get(`https://api.themoviedb.org/3/${titleType}/${tmdbId}`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  })
    .then((tmdbResponse) => {
      if (tmdbResponse && tmdbResponse.data.poster_path) {
        return Promise.resolve(`https://image.tmdb.org/t/p/w500${tmdbResponse.data.poster_path}`)
      } else {
        return Promise.resolve('https://i.imgur.com/7sR45d6.png')
      }
    })
    .catch((error) => {
      return Promise.reject('Error while retrieving poster from TMDB API: ' + error.response.data.status_message);
    })

}


const findTitleDetails = async (req, res) => {
  let errMessage;
  let result;
  await Promise.all(
    [
      findIfUserSaved(req.query.user_id, req.query.tmdb_id),
      findTextDetails(req.query.type, req.query.tmdb_id),
      findPosterUrl(req.query.type, req.query.tmdb_id)
    ]
  )
  .then((allResults) => {
    let allDetails = {...allResults[1]};
    allDetails.saved_by_user = allResults[0];
    allDetails.poster_path = allResults[2];
    res.status(200).send(allDetails);
  })
  .catch((error) => {
    res.status(400).send(error);
    return;
  })

}

module.exports.findTitleDetails = findTitleDetails;