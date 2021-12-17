require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000
const cors = require('cors')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', cors(), ((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
}))


app.get('/testroute', cors(), ((req, res) => {
  res.send('Successful GET call to /testroute express route');
}))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

