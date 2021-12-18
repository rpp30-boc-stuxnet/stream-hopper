const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Stream Hopper Coming Soon')
})

app.listen(port, () => {
  console.log(`Stream Hopper listening at http://localhost:${port}`)
})