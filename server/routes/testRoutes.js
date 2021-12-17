const express = require("express");
const router = express.Router();
const testControllers = require("../../database/controllers/test.js");

router.get("/", testControllers.findAllTests);

module.exports = router;
