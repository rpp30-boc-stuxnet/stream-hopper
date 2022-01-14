const Saved_Title = require('../models/savedTitle.js');
const axios = require('axios').default;


const findSpielbergTitles = async (req, res) => {

  if (!req.query.user_id || typeof req.query.user_id !== 'string') {
    res.status(400).send("Error: Must provide a valid 'user_id' (string) in the query parameters");
    return;
  }

  let titles = [
    {
      "type": "movie",
      "tmdb_id": 329,
      "poster_path": "https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 857,
      "poster_path": "https://image.tmdb.org/t/p/w500/1wY4psJ5NVEhCuOYROwLH2XExM2.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 333339,
      "poster_path": "https://image.tmdb.org/t/p/w500/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 424,
      "poster_path": "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 640,
      "poster_path": "https://image.tmdb.org/t/p/w500/ctjEj2xM32OvBXCq8zAdK3ZrsAj.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 1895,
      "poster_path": "https://image.tmdb.org/t/p/w500/xfSAoBEm9MNBjmlNcDYLvLSMlnq.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 85,
      "poster_path": "https://image.tmdb.org/t/p/w500/awUGN7ZCNq2EUTdpVaHDX23anOZ.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 601,
      "poster_path": "https://image.tmdb.org/t/p/w500/an0nD6uq6byfxXCfk6lQBzdL2J1.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 612,
      "poster_path": "https://image.tmdb.org/t/p/w500/iUekaw96QLInZpsNwRTlRKrZgwm.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 296098,
      "poster_path": "https://image.tmdb.org/t/p/w500/bORlvwnVJE1Z6yIg96qnLLY3LJQ.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 267935,
      "poster_path": "https://image.tmdb.org/t/p/w500/4zawxGJIH43DcoGG9Ui0WoIcrQC.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 511809,
      "poster_path": "https://image.tmdb.org/t/p/w500/zeAZTPxV5xZRNEX3rZotnsp7IVo.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 180,
      "poster_path": "https://image.tmdb.org/t/p/w500/ccqpHq5tk5W4ymbSbuoy4uYOxFI.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 873,
      "poster_path": "https://image.tmdb.org/t/p/w500/ziosRyziefrmEmAMIswpjQzvAur.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 576510,
      "poster_path": "https://image.tmdb.org/t/p/w500/8YEuXYEw9MsqAhB8aw3cBevifbs.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 578,
      "poster_path": "https://image.tmdb.org/t/p/w500/s2xcqSFfT6F7ZXHxowjxfG0yisT.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 72976,
      "poster_path": "https://image.tmdb.org/t/p/w500/oosQMP9sh9LF2xR2eKcQ1iSscWM.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 74,
      "poster_path": "https://image.tmdb.org/t/p/w500/oZmJ6hD2dc6zLCIPgw8onPMo0QC.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 15301,
      "poster_path": "https://image.tmdb.org/t/p/w500/sDWARc5aYTUKE8Y2FIGVgWXuI4K.jpg"
    },
    {
      "type": "movie",
      "tmdb_id": 879,
      "poster_path": "https://image.tmdb.org/t/p/w500/a6rB1lGXoGms7gWxRfJneQmAjNV.jpg"
    },
  ]

  let userSavedTitles = {};

  await Saved_Title.find({user_id: req.query.user_id})
    .then((savedTitles) => {
      for (var i = 0; i < savedTitles.length; i++) {
        userSavedTitles[savedTitles[i].tmdb_id] = true;
      }
    })
    .catch((error) => {
      res.status(400).send('Error while finding user\'s saved titles: ' + error);
      return;
    })

  let finalResults = [];

  for (var i = 0; i < titles.length; i++) {
      let currentRecommendation = {
        type: titles[i].type,
        tmdb_id: titles[i].tmdb_id,
        poster_path: titles[i].poster_path,
        saved_by_user: userSavedTitles[titles[i].tmdb_id] || false
      }
      finalResults.push(currentRecommendation);
  }

  res.status(200).send(finalResults)

}

module.exports.findSpielbergTitles = findSpielbergTitles;