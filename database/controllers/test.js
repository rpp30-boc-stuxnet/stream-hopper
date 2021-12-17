const Test = require('../models/test.js');

const findAllTests = async (req, res) => {
  console.log('calling findAllTests');
  let allTests = [];
  await Test.find().then((returnedTests) => {allTests = returnedTests});
  res.status(200).send(allTests)
};

module.exports.findAllTests = findAllTests;