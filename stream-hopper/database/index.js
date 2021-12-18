const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/streamhopper', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;