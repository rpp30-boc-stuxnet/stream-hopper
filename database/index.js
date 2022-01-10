const mongoose = require("mongoose");
require('dotenv').config();

const connect = async () => {
  let connectionString;

  if (process.env.NODE_ENV === 'test') {
    console.log('Using MongoDB Test Environment 🔬');
    connectionString = process.env.MONGO_TEST_URI;
  } else {
    connectionString = process.env.MONGO_URI;
  }

  try {
    await mongoose.connect(connectionString);
    console.log("MongoDB Connection Success 👍");
  } catch (error) {
    console.log("MongoDB Connection Failed 💥");
    console.log(error);
    process.exit(1);
  }
};

const disconnect = async () => {
  await mongoose.connection.close()
}

exports.connect = connect;
exports.disconnect = disconnect;
