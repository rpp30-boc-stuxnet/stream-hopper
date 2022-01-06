const Saved_Title = require('../models/savedTitle.js');
const axios = require('axios').default;

const priorityMovies = {
  '511809': true,
  '333339': true,
  '296098': true,
  '267935': true,
  '72976': true,
  '217': true,
  '612': true,
  '74': true,
  '1895': true,
  '594': true,
  '640': true,
  '180': true,
  '644': true,
  '857': true,
  '11831': true,
  '330': true,
  '424': true,
  '329': true,
  '879': true,
  '89': true,
  '10110': true,
  '576510': true,
  '873': true,
  '87': true,
  '601': true,
  '85': true,
  '578': true,
  '804095': true,
  '760686': true
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const findRelatedTitles = async (req, res) => {
  // TO-DO: Complete this function
  let threeMostRecent = [];
  let allLoggedTitles = {};

  await Saved_Title.find({user_id: req.query.user_id})
    .then((savedTitles) => {
      for (var i = 0; i < savedTitles.length; i++) {
        allLoggedTitles[savedTitles[i].tmdb_id] = true;
      }
      savedTitles = savedTitles.slice(-3);
      for (var i = 0; i < savedTitles.length; i++) {
        threeMostRecent.push({type: savedTitles[i].type, tmdb_id: savedTitles[i].tmdb_id})
      }
    })
    .catch((error) => {
      res.status(400).send('Error while finding most recent titles on user\'s list: ' + error)
    })

  let relatedTmdbIds = [];
  let finalResults = [];
  let orderModified = false;
  for (var i = 0; i < threeMostRecent.length; i++) {
    await axios.get(`https://api.themoviedb.org/3/${threeMostRecent[i].type}/${threeMostRecent[i].tmdb_id}/recommendations`, {
      params: {
        api_key: process.env.TMDB_API_KEY
      }
    })
      .then((response) => {
        for (var i = 0; i < response.data.results.slice(0,5).length; i++) {
          if (!allLoggedTitles[response.data.results[i].id]) {
            let posterUrl;
            if (response.data.results[i].poster_path) {
              posterUrl = 'https://image.tmdb.org/t/p/w500' + response.data.results[i].poster_path;
            } else {
              posterUrl = posterUrl = 'https://i.imgur.com/7sR45d6.png';
            }
            let currentRecommendation = {
              type: response.data.results[i].media_type,
              tmdb_id: response.data.results[i].id,
              poster_path: posterUrl,
              saved_by_user: false
            }
            if (priorityMovies[JSON.stringify(response.data.results[i].id)] && !orderModified) {
              finalResults.unshift(currentRecommendation);
              orderModified = true;
            } else {
              finalResults.push(currentRecommendation);
            }
            allLoggedTitles[currentRecommendation.tmdb_id] = true;
          }
        }
      })
      .catch((error) => {
        res.status(400).send('Error while fetching related ID\'s from watchmode API: ' + error)
      })
  }

  let firstElem = finalResults.shift();

  shuffleArray(finalResults);
  finalResults.unshift(firstElem);

  res.status(200).send(finalResults)

}

module.exports.findRelatedTitles = findRelatedTitles;