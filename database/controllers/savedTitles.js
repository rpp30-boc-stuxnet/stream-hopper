const axios = require('axios').default;
const Saved_Title = require('../models/savedTitle.js');

const findSavedTitles = async (req, res) => {
  await Saved_Title.find({user_id: req.query.user_id})
    .then((savedTitles) => {
      res.status(200).send(savedTitles.reverse())
    })
    .catch((error) => {
      res.status(400).send(error)
    })
}

const addSavedTitle = async (req, res) => {
  let posterPath, tmdbId, imdbId;
  await axios.get(`https://api.themoviedb.org/3/movie/${req.body.title_id}`, {
      params: {
        api_key: process.env.TMDB_API_KEY
      }
    })
      .then((result) => {
        posterPath = 'https://image.tmdb.org/t/p/w500' + result.data.poster_path;
        tmdbId = result.data.id;
        imdbId = result.data.imdb_id;
      })
      .catch((error) => {
        res.status(400).send('Error while fetching tmdb id from tmdb\'s API: ' + error)
      })

  Saved_Title.find({user_id: req.body.user_id, imdb_id: imdbId})
    .then((savedTitles) => {
      if (savedTitles.length > 0) {
        res.status(400).send('Movie already exists in user\'s list')
      } else {
        Saved_Title.create({user_id: req.body.user_id, imdb_id: imdbId, tmdb_id: tmdbId, poster_path: posterPath})
          .then(() => {
            res.status(201).send('Title added successfully');
          })
          .catch((error) => {
            res.status(400).send(error)
          })
      }
    })
    .catch((error) => {
      res.status(400).send('Error inside Saved_Title.find function: ' + error)
    })
}

const deleteSavedTitle = async (req, res) => {
  let dataToMatch = {};
  if (JSON.stringify(req.body.title_id)[1] === 't') {
    dataToMatch = {user_id: req.body.user_id, imdb_id: req.body.title_id}
  } else {
    dataToMatch = {user_id: req.body.user_id, tmdb_id: JSON.parse(req.body.title_id)}
  }
  Saved_Title.findOneAndDelete(dataToMatch)
    .then((response) => {
      if (response === null) {
        res.status(200).send('Title was not found in list')
      } else {
        res.status(200).send('Title deleted successfully');
      }
    })
    .catch((error) => {
      res.status(400).send(error)
    })
}

module.exports.findSavedTitles = findSavedTitles;
module.exports.addSavedTitle = addSavedTitle;
module.exports.deleteSavedTitle = deleteSavedTitle;