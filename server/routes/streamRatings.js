const express = require("express");
const router = express.Router();
const streamRatings = require("../../database/controllers/streamRatings.js");

router.get("/", streamRatings.findStreamRatings);
// router.post('/', streamRatings.saveThumbRating);

module.exports = router;
