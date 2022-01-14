require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const savedTitlesRoutes = require('./routes/savedTitlesRoutes.js');
const relatedTitlesRoutes = require('./routes/relatedTitlesRoutes.js');
const titleDetailsRoutes = require('./routes/titleDetailsRoutes.js');
const searchRoutes = require('./routes/searchRoutes.js');
const thumbRatings = require('./routes/thumbRatings.js');
const streamSources = require('./routes/streamSources.js');
const streamRatings = require('./routes/streamRatings.js');
const trendingTitles = require('./routes/trendingTitlesRoutes.js');
const spielbergTitles = require('./routes/spielbergTitlesRoutes.js');
const titleReviews = require('./routes/titleReviewsRoutes.js');

  const app = express();

  app.use(express.urlencoded({extended:true}));
  app.use(express.json());
  app.use(cors());
  app.use('/', express.static(path.join(__dirname, '../client/build')));
  app.use('/homepage',express.static(path.join(__dirname, '../client/build')))

  app.use('/api/savedTitles', savedTitlesRoutes);
  app.use('/api/relatedTitles', relatedTitlesRoutes);
  app.use('/api/titleDetails', titleDetailsRoutes);
  app.use('/api/search', searchRoutes);
  app.use('/api/thumbRatings', thumbRatings);
  app.use('/api/streamSources', streamSources);
  app.use('/api/streamRatings', streamRatings);
  app.use('/api/trendingTitles', trendingTitles);
  app.use('/api/spielbergTitles', spielbergTitles);
  app.use('/api/titleReviews', titleReviews);

  app.get('/', cors(), ((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  }))

  app.get('/details*', cors(), ((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  }))



module.exports = app;