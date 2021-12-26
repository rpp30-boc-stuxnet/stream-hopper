require('dotenv').config();
const path = require('path');
const express = require('express');
const port = process.env.PORT || 4000
const connectDB = require("../database/index.js");
const cors = require('cors');

const testRoutes = require('./routes/testRoutes.js');
const savedTitlesRoutes = require('./routes/savedTitlesRoutes.js');
const relatedTitlesRoutes = require('./routes/relatedTitlesRoutes.js');
const titleDetailsRoutes = require('./routes/titleDetailsRoutes.js');
const searchRoutes = require('./routes/searchRoutes.js');
const thumbRatings = require('./routes/thumbRatings.js');
const streamSources = require('./routes/streamSources.js');

connectDB();

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/testDbData', testRoutes);
app.use('/savedTitles', savedTitlesRoutes);
app.use('/relatedTitles', relatedTitlesRoutes);
app.use('/titleDetails', titleDetailsRoutes);
app.use('/search', searchRoutes);
app.use('/thumbRatings', thumbRatings);
app.use('/streamSources', streamSources);

app.get('/', cors(), ((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
}))

app.get('/testroute', cors(), ((req, res) => {
  res.send('Successful GET call to /testroute express route');
}))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

