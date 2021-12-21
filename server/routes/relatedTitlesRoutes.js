const express = require("express");
const router = express.Router();
const relatedTitlesControllers = require("../../database/controllers/relatedTitles.js");

router.get("/", relatedTitlesControllers.findRelatedTitles);

module.exports = router;
