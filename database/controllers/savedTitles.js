const axios = require('axios').default;
const Saved_Title = require('../models/savedTitle.js');

const findSavedTitles = async (req, res) => {
  //console.log('req is hitting controller: ', req.query.user_id);

  if (!req.query.user_id || typeof req.query.user_id !== 'string') {
    res.status(400).send('Error: Must provide a valid user_id (string) in the query parameters')
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
  let posterPath;

  await axios.get(`https://api.themoviedb.org/3/${req.body.type}/${req.body.tmdb_id}`, {
    params: {
      api_key: process.env.TMDB_API_KEY
    }
  })
    .then((result) => {
      posterPath = 'https://image.tmdb.org/t/p/w500' + result.data.poster_path;
    })
    .catch((error) => {
      res.status(400).send('Error while fetching tmdb id from tmdb\'s API: ' + error);
      return;
    })

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

const deleteSavedTitle = async (req, res) => {
  Saved_Title.findOneAndDelete({ user_id: req.body.user_id, tmdb_id: req.body.tmdb_id })
    .then((response) => {
      if (response === null) {
        res.status(200).send('Title was not found in list')
      } else {
        res.status(200).send('Title deleted successfully');
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