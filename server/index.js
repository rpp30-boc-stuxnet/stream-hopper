const app = require('./app')
const port = process.env.PORT || 4000
const database = require("../database/index.js");

database.connect();

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})