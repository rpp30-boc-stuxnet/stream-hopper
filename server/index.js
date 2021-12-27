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


//FOR FACEBOOK TESTING ONLY BECAUSE FACEBOOK LOGIN DOES NOT ACCEPT HTTP REQUESTS.
if (process.env.ENABLE_HTTPS_SERVER === "active") {
  const fs = require('fs');
  const https = require('https');
  const privateKey  = fs.readFileSync('/Users/ashleyreischman/HackReactor/blueOcean/stream-hopper/localhost-key.pem', 'utf8');
  const certificate = fs.readFileSync('/Users/ashleyreischman/HackReactor/blueOcean/stream-hopper/localhost.pem', 'utf8');
  const credentials = {key: privateKey, cert: certificate};
  const app = express();

  app.use('/', express.static(path.join(__dirname, '../client/build')));
  app.use('/homepage',express.static(path.join(__dirname, '../client/build')))

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(8443);
  console.log('running https server on 8443')
} else {

  connectDB();

  const app = express();

  app.use(express.urlencoded({extended:true}));
  app.use(express.json());
  app.use(cors());
  app.use('/', express.static(path.join(__dirname, '../client/build')));
  app.use('/homepage',express.static(path.join(__dirname, '../client/build')))

  app.use('/testDbData', testRoutes);
  app.use('/savedTitles', savedTitlesRoutes);
  app.use('/relatedTitles', relatedTitlesRoutes);
  app.use('/titleDetails', titleDetailsRoutes);

  app.get('/', cors(), ((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  }))

  app.get('/testroute', cors(), ((req, res) => {
    res.send('Successful GET call to /testroute express route');
  }))

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}


