require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 4000
const cors = require('cors')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get('/', cors(), ((req, res) => {
  res.send('This is working')
}))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

