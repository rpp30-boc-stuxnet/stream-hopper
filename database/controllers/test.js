const Test = require('../models/test.js');

const findAllTests = async (req, res) => {
  res.status(200).send('Success')
};

module.exports.findAllTests = findAllTests;