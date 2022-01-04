const express = require("express");
const router = express.Router();
const trendingTitlesControllers = require("../../database/controllers/trendingTitles.js");

router.get("/", trendingTitlesControllers.findTrendingTitles);

module.exports = router;