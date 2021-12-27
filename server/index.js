require('dotenv').config();
const path = require('path');
const express = require('express');
const port = process.env.PORT || 4000
//const connectDB = require("../database/index.js");
const cors = require('cors');

const testRoutes = require('./routes/testRoutes.js');
const savedTitlesRoutes = require('./routes/savedTitlesRoutes.js');
const relatedTitlesRoutes = require('./routes/relatedTitlesRoutes.js');
const titleDetailsRoutes = require('./routes/titleDetailsRoutes.js');
const searchRoutes = require('./routes/searchRoutes.js');
const thumbRatings = require('./routes/thumbRatings.js');
const streamSources = require('./routes/streamSources.js');
const streamRatings = require('./routes/streamRatings.js');

//connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api/testDbData', testRoutes);
app.use('/api/savedTitles', savedTitlesRoutes);
app.use('/api/relatedTitles', relatedTitlesRoutes);
app.use('/api/titleDetails', titleDetailsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/thumbRatings', thumbRatings);
app.use('/api/streamSources', streamSources);
app.use('/api/streamRatings', streamRatings);

app.get('/', cors(), ((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
}))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

