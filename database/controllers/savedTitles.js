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
  Saved_Title.find({user_id: req.body.user_id, imdb_id: req.body.imdb_id})
    .then((savedTitles) => {
      if (savedTitles.length > 0) {
        res.status(400).send('Movie already exists in user\'s list')
      } else {
        Saved_Title.create({user_id: req.body.user_id, imdb_id: req.body.imdb_id})
          .then(() => {
            res.status(201).send('Title added successfully');
          })
          .catch((error) => {
            res.status(400).send(error)
          })
      }
    })
    .catch((error) => {
      res.status(400).send(error)
    })
}

const deleteSavedTitle = async (req, res) => {
  Saved_Title.findOneAndDelete({user_id: req.body.user_id, imdb_id: req.body.imdb_id})
    .then(() => {
      res.status(200).send('Title deleted successfully');
    })
    .catch((error) => {
      res.status(400).send(error)
    })
}

module.exports.findSavedTitles = findSavedTitles;
module.exports.addSavedTitle = addSavedTitle;
module.exports.deleteSavedTitle = deleteSavedTitle;