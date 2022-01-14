const axios = require('axios').default;
const Saved_Title = require('../models/savedTitle.js');

const findSavedTitles = async (req, res) => {
  if (!req.query.user_id || typeof req.query.user_id !== 'string') {
    res.status(400).send('Error: Must provide a valid \'user_id\' (string) in the query parameters')
    return;
  }

  await Saved_Title.find({ user_id: req.query.user_id })
    .then((savedTitles) => {
      for (var i = 0; i < savedTitles.length; i++) {
        savedTitles[i]._doc.saved_by_user = true;
      }
      res.status(200).send(savedTitles.reverse())
    })
    .catch((error) => {
      console.log('error getting saved titles: ', error)
      res.status(400).send(error);
      return;
    })
}

const addSavedTitle = async (req, res) => {
  if (!req.body.user_id || typeof req.body.user_id !== 'string') {
    res.status(400).send('Error: Must provide a valid \'user_id\' (string) in the body parameters');
    return;
  } else if (!req.body.type || typeof req.body.type !== 'string') {
    res.status(400).send('Error: Must provide a valid \'type\' (string) in the body parameters');
    return;
  } else if (!req.body.tmdb_id || typeof req.body.tmdb_id !== 'number' || req.body.tmdb_id % 1 !== 0) {
    res.status(400).send('Error: Must provide a valid \'tmdb_id\' (integer) in the body parameters');
    return;
  }

  let posterPath;
  let tmdbError;

  await axios.get(`https://api.themoviedb.org/3/${req.body.type}/${req.body.tmdb_id}`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  })
    .then((result) => {
      if (result.data.id !== req.body.tmdb_id) {
        tmdbError = true;
        res.status(400).send('Error while fetching tmdb id from tmdb\'s API: Could not find title in tmdb database');
        return;
      }
      posterPath = 'https://image.tmdb.org/t/p/w500' + result.data.poster_path;
    })
    .catch((error) => {
      tmdbError = true;
      res.status(400).send('Error while fetching tmdb id from tmdb\'s API: ' + error.response.data.status_message);
      return;
    })

  if(!tmdbError) {
    Saved_Title.find({ user_id: req.body.user_id, type: req.body.type, tmdb_id: req.body.tmdb_id })
      .then((savedTitles) => {
        if (savedTitles.length > 0) {
          res.status(400).send('Movie already exists in user\'s list')
        } else {
          Saved_Title.create({ user_id: req.body.user_id, type: req.body.type, tmdb_id: req.body.tmdb_id, poster_path: posterPath })
            .then(() => {
              res.status(201).send('Title added successfully');
            })
            .catch((error) => {
              res.status(400).send(error);
              return;
            })
        }
      })
      .catch((error) => {
        res.status(400).send('Error inside Saved_Title.find function: ' + error);
        return;
      })
  }

}

const deleteSavedTitle = async (req, res) => {
  if (!req.body.user_id || typeof req.body.user_id !== 'string') {
    res.status(400).send("Error: Must provide a valid 'user_id' (string) in the body parameters")
    return;
  } else if (!req.body.tmdb_id || typeof req.body.tmdb_id !== 'number') {
    res.status(400).send("Error: Must provide a valid 'tmdb_id' (integer) in the body parameters")
    return;
  }
  Saved_Title.findOneAndDelete({ user_id: req.body.user_id, tmdb_id: req.body.tmdb_id })
    .then((response) => {
      if (response === null) {
        res.status(400).send("Title was not found in user's list");
        return;
      } else {
        res.status(200).send('Title deleted successfully');
        return;
      }
    })
    .catch((error) => {
      res.status(400).send(error)
      return;
    })
}

module.exports.findSavedTitles = findSavedTitles;
module.exports.addSavedTitle = addSavedTitle;
module.exports.deleteSavedTitle = deleteSavedTitle;